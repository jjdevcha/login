"use client"

import { deleteTweet } from "@/app/tweets/[id]/action"
import { TrashIcon } from "@heroicons/react/16/solid"

export default function DeleteYarn({ tweetId }: { tweetId: number }) {
	return (
		<form action={() => deleteTweet(tweetId)}>
			<button
				type="submit"
				className="p-2 rounded-md bg-orange-400 text-white">
				<TrashIcon className="size-4" />
			</button>
		</form>
	)
}
