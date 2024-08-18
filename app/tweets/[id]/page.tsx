import Button from "@/components/button"
import LikeButton from "@/components/likeButton"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToTimeAgo } from "@/lib/utils"
import { unstable_cache as nextCache } from "next/cache"
import { notFound } from "next/navigation"

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
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
	})
	return tweet
}

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
	tags: ["tweet-detail"],
	revalidate: 60,
})

async function getLikeStatus(tweetId: number, sessionId: number | null) {
	if (sessionId) {
		const isLiked = await db.like.findUnique({
			where: {
				id: {
					tweetId,
					userId: sessionId,
				},
			},
		})
		const likeCount = await db.like.count({
			where: {
				tweetId,
			},
		})
		return {
			likeCount,
			isLiked: Boolean(isLiked),
		}
	}

	return { likeCount: 0, isLiked: false }
}

function getCachedLikeStatus(tweetId: number, sessionId: number | null) {
	const cachedOperation = nextCache(getLikeStatus, ["like-status"], {
		tags: [`like-status-${tweetId}`],
	})
	return cachedOperation(tweetId, sessionId)
}

export default async function TweetDetail({
	params,
}: {
	params: { id: string }
}) {
	const session = await getSession()

	const id = Number(params.id)
	if (isNaN(id)) {
		return notFound()
	}

	const tweet = await getCachedTweet(id)
	if (!tweet) {
		return notFound()
	}

	const { likeCount, isLiked } = await getCachedLikeStatus(
		id,
		session?.id || null
	)

	return (
		<div className="p-4 flex flex-col gap-3">
			<div className="flex flex-col">
				<span className="text-lg font-semibold">
					{tweet.user.username}
				</span>
				<span>{formatToTimeAgo(tweet.created_at.toString())}</span>
			</div>
			<h1>{tweet.content}</h1>
			<LikeButton tweetId={id} likeCount={likeCount} isLiked={isLiked} />
			{session.id === tweet.userId && <Button text="Edit" />}
		</div>
	)
}
