"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { SpeakerWaveIcon } from "@heroicons/react/16/solid"
import { useFormState } from "react-dom"
import { PASSWORD_MIN_LENGTH } from "../../lib/constants"
import { logIn } from "./action"

export default function Login() {
	const [state, action] = useFormState(logIn, null)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
			<SpeakerWaveIcon className="w-12 h-12 text-orange-500" />
			<form className="flex flex-col gap-4" action={action}>
				<Input
					name="email"
					type="email"
					placeholder="Email"
					required
					errors={state?.fieldErrors?.email}
				/>

				<Input
					name="password"
					type="password"
					placeholder="Password"
					required
					errors={state?.fieldErrors?.password}
					minLength={PASSWORD_MIN_LENGTH}
				/>

				<Button text="Log in" />
			</form>
		</div>
	)
}
