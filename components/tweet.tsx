import { formatToTimeAgo } from "@/lib/utils"
import Link from "next/link"

export interface TweetProps {
	id: string
	created_at: string
	content: string
	user: {
		username: string
		id: number
	}
	likes: { userId: number }[]
}

export default function Tweet({
	id,
	created_at,
	content,
	user,
	likes,
}: TweetProps) {
	return (
		<Link href={`/tweets/${id}`} className="flex gap-5">
			<div>
				<span>{user.username}</span>
			</div>
			<div>
				<span>{content}</span>
			</div>
			<div>
				<span>{formatToTimeAgo(created_at.toString())}</span>
			</div>
			<div>
				<span>Likes {likes.length}</span>
			</div>
		</Link>
	)
}
