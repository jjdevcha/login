"use client"

import { useState } from "react"
import { addComment } from "./action"
import Button from "./button"
import CommentsList from "./comments-list"
import Input from "./input"

interface AddCommentProps {
	tweetId: number
	initialComments: {
		user: {
			id: number
			username: string
		}
		id: number
		created_at: Date
		content: string
	}[]
	username: string
}

export default async function AddComment({
	tweetId,
	initialComments,
	username,
}: AddCommentProps) {
	const [comments, setComments] = useState(initialComments)

	return (
		<div>
			<form action={(formData) => addComment(formData, tweetId)}>
				<Input
					name="comment"
					type="text"
					placeholder="Write your comment here"
					required
				/>
				<Button text="Post Comment" />
			</form>
			<CommentsList comments={comments} />
		</div>
	)
}
