"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function getMoreTweets(page: number) {
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
		skip: page * 3,
		take: 3,
		orderBy: {
			created_at: "desc",
		},
	})

	return tweets
}

const tweetSchema = z.object({
	tweet: z
		.string({ required_error: "Text is required" })
		.min(10, "tweeting should be at least 10 characters"),
})

export async function addTweet(_: any, formData: FormData) {
	const data = {
		tweet: formData.get("tweet"),
	}

	const result = tweetSchema.safeParse(data)
	if (!result.success) {
		return result.error.flatten()
	} else {
		const session = await getSession()
		if (session.id) {
			const tweet = await db.tweet.create({
				data: {
					content: result.data.tweet,
					userId: session.id,
				},
			})
			redirect(`/tweets/${tweet.id}`)
		}
	}
}

const commentSchema = z.object({
	comment: z
		.string({ required_error: "Text is required" })
		.min(10, "Comment should be at least 10 characters"),
})

export async function addComment(formData: FormData, tweetId: number) {
	const data = {
		comment: formData.get("comment"),
	}

	const result = commentSchema.safeParse(data)
	if (!result.success) {
		return result.error.flatten()
	} else {
		const session = await getSession()
		if (session.id) {
			const comment = await db.comment.create({
				data: {
					content: result.data.comment,
					user: {
						connect: {
							id: session.id,
						},
					},
					tweet: {
						connect: {
							id: tweetId,
						},
					},
				},
				include: {
					user: true,
				},
			})
			revalidatePath(`/tweets/${tweetId}`)
			return comment
		}
	}
}
