"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function getMoreTweets(page: number) {
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
		skip: page * 5,
		take: 5,
		orderBy: {
			created_at: "desc",
		},
	})

	return tweets
}

const yarnSchema = z.object({
	yarn: z
		.string({ required_error: "Text is required" })
		.min(10, "Yarning should be at least 10 characters"),
})

export async function yarn(_: any, formData: FormData) {
	const data = {
		yarn: formData.get("yarn"),
	}

	const result = yarnSchema.safeParse(data)
	if (!result.success) {
		return result.error.flatten()
	} else {
		const session = await getSession()
		if (session.id) {
			const yarn = await db.tweet.create({
				data: {
					content: result.data.yarn,
					userId: session.id,
				},
			})
			redirect("/")
		}
	}
}
