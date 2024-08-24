import AddComment from "@/components/addComment"
import DeleteYarn from "@/components/deleteYarn"
import LikeButton from "@/components/likeButton"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { formatToTimeAgo } from "@/lib/utils"
import { unstable_cache as nextCache } from "next/cache"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getUsername() {
	const session = await getSession()
	if (session.id) {
		const username = await db.user.findUnique({
			where: {
				id: session.id,
			},
			select: {
				username: true,
			},
		})
		return username
	}
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

async function getInitialComments(tweetId: number) {
	const comments = await db.comment.findMany({
		where: {
			tweetId,
		},
		select: {
			id: true,
			content: true,
			created_at: true,
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
	return comments
}

async function getLikeStatus(tweetId: number, sessionId: number) {
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

function getCachedLikeStatus(tweetId: number, sessionId: number) {
	const cachedOperation = nextCache(getLikeStatus, ["like-status"], {
		tags: [`like-status-${tweetId}`],
	})
	return cachedOperation(tweetId, sessionId!)
}

export default async function TweetDetail({
	params,
}: {
	params: { id: string }
}) {
	const session = await getSession()
	const username = await getUsername()

	const id = Number(params.id)
	if (isNaN(id)) {
		return notFound()
	}

	const tweet = await getTweet(id)
	if (!tweet) {
		return notFound()
	}

	const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!)
	const initialComments = await getInitialComments(id)

	return (
		<div className="p-6 flex flex-col gap-3">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<Link href={`/users/${tweet.user.username}`}>
						<span className="text-lg font-semibold">
							{tweet.user.username}
						</span>
					</Link>
					<span>{formatToTimeAgo(tweet.created_at.toString())}</span>
				</div>
				{session.id === tweet.userId && <DeleteYarn tweetId={id} />}
			</div>
			<h1>{tweet.content}</h1>
			<LikeButton tweetId={id} likeCount={likeCount} isLiked={isLiked} />
			<AddComment
				tweetId={id}
				initialComments={initialComments}
				username={username!.username}
			/>
		</div>
	)
}
