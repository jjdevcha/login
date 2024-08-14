import Button from "@/components/button"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToTimeAgo } from "@/lib/utils"
import { notFound } from "next/navigation"

async function getIsUser(userId: number) {
	const session = await getSession()
	if (session.id) {
		return session.id === userId
	}
	return false
}

async function getTweet(id: number) {
	const tweet = await db.tweet.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					username: true,
					id: true,
				},
			},
		},
	})
	return tweet
}

export default async function TweetDetail({
	params,
}: {
	params: { id: string }
}) {
	const id = Number(params.id)
	if (isNaN(id)) {
		return notFound()
	}

	const tweet = await getTweet(id)
	if (!tweet) {
		return notFound()
	}

	const isUser = await getIsUser(tweet.userId)

	return (
		<div>
			<h1>{tweet.content}</h1>
			<p>by {tweet.user.username}</p>
			<p>Posted {formatToTimeAgo(tweet.created_at.toString())}</p>
			{isUser && <Button text="Edit" />}
		</div>
	)
}
