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
		<div className="flex flex-col gap-2 my-4">
			<h2 className="font-bold">Comments</h2>
			{comments.map((comment) => (
				<div key={comment.id} className="flex">
					<span className="font-bold">{comment.user.username}</span> :{" "}
					{comment.content}
				</div>
			))}
		</div>
	)
}
