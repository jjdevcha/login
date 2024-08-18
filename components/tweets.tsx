import TweetsList from "@/components/tweets-list"
import db from "@/lib/db"
import { Prisma } from "@prisma/client"
import { unstable_cache as nextCache } from "next/cache"

const getCachedTweets = nextCache(getInitialTweets, ["tweets"])

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
		orderBy: {
			created_at: "desc",
		},
	})
	return tweets
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>

export default async function Tweets() {
	const initialTweets = await getCachedTweets()
	return (
		<div>
			<TweetsList initialTweets={initialTweets} />
		</div>
	)
}
