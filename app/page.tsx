"use client"

import FormButton from "@/components/form-btn"
import Input from "@/components/input"
import { FireIcon } from "@heroicons/react/16/solid"
import { useFormState } from "react-dom"
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "../lib/constants"
import { handleForm } from "./action"

export default function Home() {
	const [state, action] = useFormState(handleForm, null)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
			<FireIcon className="w-12 h-12 text-red-500" />
			<form className="flex flex-col gap-4" action={action}>
				<Input
					name="email"
					type="email"
					placeholder="Email"
					required
					errors={state?.fieldErrors?.email}
				/>
				<Input
					name="username"
					type="text"
					placeholder="Username"
					required
					errors={state?.fieldErrors?.username}
					minLength={USERNAME_MIN_LENGTH}
				/>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					required
					errors={state?.fieldErrors?.password}
					minLength={PASSWORD_MIN_LENGTH}
				/>

				<FormButton text="Log in" />
				{state?.loggedIn && (
					<div className="w-full h-10 bg-green-500 text-white p-2 flex justify-center items-center rounded-md">
						Welcome back
					</div>
				)}
			</form>
		</div>
	)
}
