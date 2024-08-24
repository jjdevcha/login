import TweetsList from "@/components/tweets-list"
import db from "@/lib/db"
import { SpeakerWaveIcon } from "@heroicons/react/16/solid"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Prisma } from "@prisma/client"
import Link from "next/link"
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
		<div className="flex flex-col items-center min-h-screen p-6 relative">
			<Link href={`/users/${user.username}`}>
				<UserCircleIcon className="absolute top-6 right-6 size-8 text-orange-500" />
			</Link>
			<div className="my-auto flex flex-col items-center gap-2 *:font-medium">
				<SpeakerWaveIcon className="w-12 h-12 text-orange-500" />
				<h1 className="text-4xl ">Yarning</h1>
				<h2 className="text-2xl">Let's have a yarn together!</h2>
			</div>
			<AddYarn />
			{InitialTweets.length ? (
				<TweetsList initialTweets={InitialTweets} />
			) : (
				<span>No one is yarning yet!</span>
			)}
		</div>
	)
}
