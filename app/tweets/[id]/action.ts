"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidateTag } from "next/cache"

export async function likeTweet(tweetId: number) {
	await new Promise((response) => setTimeout(response, 1000))
	const session = await getSession()
	try {
		await db.like.create({
			data: {
				tweetId,
				userId: session.id!,
			},
		})
		revalidateTag(`like-statues-${tweetId}`)
	} catch (error) {
		console.error(error)
	}
}

export async function unlikeTweet(tweetId: number) {
	await new Promise((response) => setTimeout(response, 1000))
	const session = await getSession()
	try {
		await db.like.delete({
			where: {
				id: {
					tweetId,
					userId: session.id!,
				},
			},
		})
		revalidateTag(`like-statues-${tweetId}`)
	} catch (error) {
		console.error(error)
	}
}
