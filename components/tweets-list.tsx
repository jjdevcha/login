"use client"

import { InitialTweets } from "@/components/tweets"
import { useEffect, useRef, useState } from "react"
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
	const trigger = useRef<HTMLSpanElement>(null)
	useEffect(() => {
		const observer = new IntersectionObserver(
			async (
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			) => {
				const element = entries[0]
				if (element.isIntersecting && trigger.current) {
					observer.unobserve(trigger.current)
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
			},
			{
				threshold: 1.0,
			}
		)
		if (trigger.current) {
			observer.observe(trigger.current)
		}
		return () => {
			observer.disconnect()
		}
	}, [page])

	return (
		<div className="p-5 flex flex-col gap-5">
			{tweets.map((tweet) => (
				<Tweet
					key={tweet.id}
					id={tweet.id.toString()}
					created_at={tweet.created_at.toString()}
					content={tweet.content}
					user={tweet.user}
					likes={tweet._count.likes}
					comments={tweet._count.comments}
				/>
			))}
			{!isLastPage ? (
				<span
					ref={trigger}
					style={{ marginTop: `${page + 1 * 900}vh` }}
					className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95">
					{loading ? "Loading..." : "Load more"}
				</span>
			) : null}
		</div>
	)
}
