"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import Tweet from "@/components/tweet"
import { SpeakerWaveIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { InitialTweets } from "../(home)/page"
import { searchTweets } from "./action"

export default function Search() {
	const [search, setSearch] = useState("")
	const [q, setQ] = useState<string | null>("")
	const router = useRouter()
	const searchParams = useSearchParams()

	const [tweets, setTweets] = useState<InitialTweets>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		router.push(`/search?q=${encodeURIComponent(search)}`)
		setQ(search)

		try {
			const tweets = await searchTweets(search)
			setTweets(tweets)
		} catch (error: any) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-4 p-6 w-[100%] min-h-screen mx-auto ">
			<div className="w-[100%] h-12 flex justify-center items-center p-4">
				<Link
					href="/"
					className="flex flex-col justify-center items-center">
					<SpeakerWaveIcon className="size-8 text-orange-500" />
					<h1 className="font-bold">Yarning</h1>
				</Link>
			</div>
			<form onSubmit={handleSubmit}>
				<Input
					type="text"
					name="search"
					placeholder="Search for a tweet"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					required
				/>
				<Button text="Search" />
			</form>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<div className="flex flex-col gap-5">
					{tweets.map((tweet) => (
						<Tweet key={tweet.id} {...tweet} />
					))}
				</div>
			)}
		</div>
	)
}
