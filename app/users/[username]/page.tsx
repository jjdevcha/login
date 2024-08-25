import Button from "@/components/button"
import Header from "@/components/header"
import Tweet from "@/components/tweet"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { PencilSquareIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

async function getUser(username: string) {
	const user = await db.user.findUnique({
		where: {
			username,
		},
	})
	if (user) {
		return user
	}
	notFound()
}

async function getUserTweets(username: string) {
	const tweets = await db.tweet.findMany({
		where: {
			user: {
				username,
			},
		},
		select: {
			user: {
				select: {
					username: true,
					id: true,
				},
			},
			id: true,
			content: true,
			created_at: true,
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
		take: 3,
		orderBy: {
			created_at: "desc",
		},
	})
	return tweets
}

export default async function userProfile({
	params,
}: {
	params: { username: string }
}) {
	const session = await getSession()
	const username = params.username
	const user = await getUser(username)
	const isOwner = session.id === user.id
	const logOut = async () => {
		"use server"
		const session = await getSession()
		session.destroy()
		redirect("/login")
	}
	const userTweets = await getUserTweets(username!)
	return (
		<div className="flex flex-col justify-center w-full min-h-screen gap-4 p-6">
			<Header username={username} />
			<h1 className="text-2xl font-extrabold">Profile</h1>
			{isOwner && (
				<Link href={`/users/${username}/edit`}>
					<button className="bg-orange-500 text-white p-2 rounded-md">
						<PencilSquareIcon className="size-5" />
					</button>
				</Link>
			)}
			<h2>username: {username}</h2>
			<h2>email: {user?.email}</h2>
			<h2 className="font-bold text-lg">{username}'s yarns:</h2>
			{userTweets.length ? (
				userTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
			) : (
				<span>You haven't yarned yet!</span>
			)}
			{isOwner && (
				<form action={logOut}>
					<Button text="Log out" />
				</form>
			)}
		</div>
	)
}
