"use server"

import db from "@/lib/db"

export async function searchTweets(q: string) {
	const tweets = await db.tweet.findMany({
		where: {
			content: {
				contains: q,
			},
		},
		select: {
			user: {
				select: {
					username: true,
					id: true,
				},
			},
			id: true,
			content: true,
			created_at: true,
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
		orderBy: {
			created_at: "desc",
		},
	})
	return tweets
}
