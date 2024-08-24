"use client"

interface CommentProps {
	comments: {
		user: {
			id: number
			username: string
		}
		id: number
		created_at: Date
		content: string
	}[]
}

export default function CommentsList({ comments }: CommentProps) {
	return (
		<div>
			{comments.map((comment) => (
				<div key={comment.id}>
					<p>{comment.content}</p>
					<p>{comment.user.username}</p>
				</div>
			))}
		</div>
	)
}
