import { SpeakerWaveIcon } from "@heroicons/react/16/solid"
import { redirect } from "next/navigation"
import Tweets from "../components/tweets"
import AddYarn from "./../components/addYarn"
import getSession from "./../lib/session"

export default async function Home() {
	const session = await getSession()

	if (!session?.id) {
		redirect("/login")
	}
	console.log("Session data:", session)
	return (
		<div className="flex flex-col items-center min-h-screen p-6">
			<div className="my-auto flex flex-col items-center gap-2 *:font-medium">
				<SpeakerWaveIcon className="w-12 h-12 text-orange-500" />
				<h1 className="text-4xl ">Yarning</h1>
				<h2 className="text-2xl">Let's have a yarn together!</h2>
			</div>
			<AddYarn />
			<Tweets />
		</div>
	)
}
