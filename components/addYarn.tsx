"use client"

import { useFormState } from "react-dom"
import { addTweet } from "./action"
import Button from "./button"
import Input from "./input"

export default function AddYarn() {
	const [state, action] = useFormState(addTweet, null)

	return (
		<div>
			<form action={action} className="p-5 flex flex-col gap-5">
				<Input
					name="tweet"
					type="text"
					placeholder="What's on your mind"
					required
					errors={state?.fieldErrors?.tweet}
				/>
				<Button text="Let's Yarn!" />
			</form>
		</div>
	)
}
