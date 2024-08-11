"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { useFormState } from "react-dom"
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "../../lib/constants"
import { createAccount } from "./action"

export default function CreateAccount() {
	const [state, dispatch] = useFormState(createAccount, null)
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
			<div className="flex flex-col gap-2 *:font-medium items-center">
				<h1 className="text-2xl">Hello</h1>
				<h2 className="text-xl">Create your account</h2>
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<Input
					name="username"
					type="text"
					placeholder="Username"
					required
					errors={state?.fieldErrors.username}
					minLength={USERNAME_MIN_LENGTH}
				/>
				<Input
					name="email"
					type="email"
					placeholder="Email"
					required
					errors={state?.fieldErrors.email}
				/>
				<Input
					name="password"
					type="password"
					placeholder="Password"
					minLength={PASSWORD_MIN_LENGTH}
					required
					errors={state?.fieldErrors.password}
				/>
				<Input
					name="confirm_password"
					type="password"
					placeholder="Confirm Password"
					required
					minLength={PASSWORD_MIN_LENGTH}
					errors={state?.fieldErrors.confirm_password}
				/>
				<Button text="Create account" />
			</form>
		</div>
	)
}
