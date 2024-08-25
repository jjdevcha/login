import { SpeakerWaveIcon, UserCircleIcon } from "@heroicons/react/16/solid"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function Header({ username }: { username: string }) {
	return (
		<div
			className="w-[100%
        ] h-12 flex justify-between items-center p-4">
			<Link href="/search">
				<MagnifyingGlassIcon className="size-8 text-orange-500" />
			</Link>
			<Link
				href="/"
				className="flex flex-col justify-center items-center">
				<SpeakerWaveIcon className="size-8 text-orange-500" />
				<h1 className="font-bold">Yarning</h1>
			</Link>
			<Link href={`/users/${username}`}>
				<UserCircleIcon className="size-8 text-orange-500" />
			</Link>
		</div>
	)
}
