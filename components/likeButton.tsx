"use client"

import { likeTweet, unlikeTweet } from "@/app/tweets/[id]/action"
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { useOptimistic } from "react"

interface LikeButtonProps {
	isLiked: boolean
	likeCount: number
	tweetId: number
}

export default function LikeButton({
	isLiked,
	likeCount,
	tweetId,
}: LikeButtonProps) {
	const [state, reducerFn] = useOptimistic(
		{ isLiked, likeCount },
		(prev, payload) => ({
			isLiked: !prev.isLiked,
			likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
		})
	)
	const handleLike = async () => {
		reducerFn(undefined)
		if (isLiked) {
			await unlikeTweet(tweetId)
		} else {
			await likeTweet(tweetId)
		}
	}

	return (
		<button
			onClick={handleLike}
			className={`flex items-center justify-center rounded-md p-2 gap-2 w-[80px] hover:border-orange-500 ${
				state.isLiked
					? "bg-orange-200 text-white border-orange-500"
					: "hover:border-black"
			}`}>
			{state.isLiked ? (
				<HeartIconSolid className="text-orange-500 size-5" />
			) : (
				<HeartIconOutline className="text-orange-500 size-5" />
			)}
			{state.likeCount}
		</button>
	)
}
