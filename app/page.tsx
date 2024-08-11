import Button from "@/components/button"
import { SpeakerWaveIcon } from "@heroicons/react/16/solid"
import Link from "next/link"

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-between min-h-screen p-6">
			<div className="my-auto flex flex-col items-center gap-2 *:font-medium">
				<SpeakerWaveIcon className="w-12 h-12 text-orange-500" />
				<h1 className="text-4xl ">Yarning</h1>
				<h2 className="text-2xl">Let's have a yarn together!</h2>
			</div>
			<div className="flex flex-col items-center gap-3 w-full">
				<Link href="/create-account">
					<Button text="Create account" />
				</Link>
				<div className="flex gap-2">
					<span>Already have an account?</span>
					<Link
						href="/login"
						className="hover:underline text-orange-500">
						Log in
					</Link>
				</div>
			</div>
		</div>
	)
}
