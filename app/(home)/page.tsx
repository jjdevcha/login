import Header from "@/components/header"
import TweetsList from "@/components/tweets-list"
import db from "@/lib/db"
import { Prisma } from "@prisma/client"
import { notFound, redirect } from "next/navigation"
import AddYarn from "../../components/addYarn"
import getSession from "../../lib/session"

async function getUser() {
	const session = await getSession()
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		})
		if (user) {
			return user
		}
	}
	notFound()
}

async function getInitialTweets() {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			created_at: true,
			content: true,
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
			user: {
				select: {
					username: true,
					id: true,
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

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>

export default async function Home() {
	const session = await getSession()
	const user = await getUser()

	if (!session?.id) {
		redirect("/login")
	}

	console.log("Session data:", session)

	const InitialTweets = await getInitialTweets()
	return (
		<div className="flex flex-col min-h-screen p-6 w-[100%]">
			<Header username={user.username} />
			<AddYarn />
			{InitialTweets.length ? (
				<TweetsList initialTweets={InitialTweets} />
			) : (
				<span>No one is yarning yet!</span>
			)}
		</div>
	)
}
