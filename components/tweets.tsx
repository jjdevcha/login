import TweetsList from "@/components/tweets-list"
import db from "@/lib/db"
import { Prisma } from "@prisma/client"

async function getInitialTweets() {
	const tweets = await db.tweet.findMany({
		select: {
			id: true,
			created_at: true,
			content: true,
			user: {
				select: {
					username: true,
					id: true,
				},
			},
			likes: {
				select: {
					userId: true,
				},
			},
		},
	})
	return tweets
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>

export default async function Tweets() {
	const initialTweets = await getInitialTweets()
	return (
		<div>
			<TweetsList initialTweets={initialTweets} />
		</div>
	)
}
