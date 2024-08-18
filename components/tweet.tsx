import { formatToTimeAgo } from "@/lib/utils"
import {
	ChatBubbleBottomCenterIcon,
	HeartIcon,
} from "@heroicons/react/16/solid"
import Link from "next/link"

export interface TweetProps {
	id: string
	created_at: string
	content: string
	user: {
		username: string
		id: number
	}
	likes: number
	comments: number
}

export default function Tweet({
	id,
	created_at,
	content,
	user,
	likes,
	comments,
}: TweetProps) {
	return (
		<Link
			href={`/tweets/${id}`}
			className="flex flex-col gap-5 pb-5 border-b border-neutral-500 last:pb-0 last:border-b-0">
			<div className="font-bold">
				<span>{user.username}</span>
			</div>
			<div>
				<span>{content}</span>
			</div>
			<div className="text-xs">
				<span>{formatToTimeAgo(created_at.toString())}</span>
			</div>
			<div className="flex gap-4 text-xs">
				<span className="text-center">
					<HeartIcon className="text-orange-500 size-5" /> {likes}
				</span>
				<span className="text-center">
					<ChatBubbleBottomCenterIcon className="text-orange-500 size-5" />{" "}
					{comments}
				</span>
			</div>
		</Link>
	)
}
