"use server"

import db from "@/lib/db"
import getSession from "@/lib/session"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

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
		revalidateTag(`like-status-${tweetId}`)
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
		revalidateTag(`like-status-${tweetId}`)
	} catch (error) {
		console.error(error)
	}
}

export async function deleteTweet(tweetId: number) {
	await db.tweet.delete({
		where: {
			id: tweetId,
		},
	})
	redirect("/")
}
