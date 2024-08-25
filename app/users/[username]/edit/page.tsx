"use client"

import Button from "@/components/button"
import Header from "@/components/header"
import Input from "@/components/input"
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants"
import { useFormState } from "react-dom"
import { editProfileAction } from "./action"

export default function editProfile({
	params,
}: {
	params: { username: string }
}) {
	const username = params.username
	const [state, action] = useFormState(editProfileAction, null)

	return (
		<div className="flex flex-col gap-4 p-4 w-full min-h-screen">
			<Header username={username} />
			<h1 className="text-lg font-bold">Edit Profile</h1>
			<form action={action}>
				<label>
					Username
					<Input
						name="username"
						type="text"
						placeholder={username}
						errors={state?.fieldErrors?.username}
						minLength={USERNAME_MIN_LENGTH}
					/>
				</label>
				<label>
					Email
					<Input
						name="email"
						type="text"
						errors={state?.fieldErrors?.email}
					/>
				</label>
				<label>
					Password
					<Input
						name="password"
						type="text"
						placeholder="New password"
						minLength={PASSWORD_MIN_LENGTH}
						errors={state?.fieldErrors?.password}
					/>
				</label>
				<label>
					Confirm Password
					<Input
						name="confirm_password"
						type="text"
						placeholder="Confirm password"
						errors={state?.fieldErrors?.confirm_password}
					/>
				</label>
				<label>
					Bio
					<Input
						name="bio"
						type="text"
						errors={state?.fieldErrors?.bio}
					/>
				</label>

				<Button text="Save" />
			</form>
		</div>
	)
}
