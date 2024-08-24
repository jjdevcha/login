"use client"

import { InitialTweets } from "@/app/(home)/page"
import { useState } from "react"
import { getMoreTweets } from "./action"
import Tweet from "./tweet"

interface TweetsListProps {
	initialTweets: InitialTweets
}

export default function TweetsList({ initialTweets }: TweetsListProps) {
	const [tweets, setTweets] = useState(initialTweets)
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)
	const [isLastPage, setIsLastPage] = useState(false)

	const onLoadMore = async () => {
		setLoading(true)
		const newTweets = await getMoreTweets(page + 1)
		if (newTweets.length !== 0) {
			setPage((prev) => prev + 1)
			setTweets((prev) => [...prev, ...newTweets])
		} else {
			setIsLastPage(true)
		}
		setLoading(false)
	}

	return (
		<div className="p-5 flex flex-col gap-5">
			{tweets.map((tweet) => (
				<Tweet key={tweet.id} {...tweet} />
			))}
			{!isLastPage ? (
				<button
					onClick={onLoadMore}
					disabled={loading}
					className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
					{loading ? "Loading..." : "Load more"}
				</button>
			) : (
				<span className="bg-orange-400 p-2 text-xs text-white text-center rounded-md">
					No more yarns to load :)
				</span>
			)}
		</div>
	)
}
