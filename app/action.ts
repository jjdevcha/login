"use server"

import {
	EMAIL_REGEX,
	EMAIL_REGEX_ERROR,
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEX,
	PASSWORD_REGEX_ERROR,
	USERNAME_MIN_LENGTH,
} from "@/lib/constants"
import { z } from "zod"

const formSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email()
		.toLowerCase()
		.regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
	username: z
		.string({
			required_error: "Username is required",
		})
		.trim()
		.toLowerCase()
		.min(
			USERNAME_MIN_LENGTH,
			"Username should be at least 5 characters long"
		),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(
			PASSWORD_MIN_LENGTH,
			"Password should be at least 10 characters long"
		)
		.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})

export async function handleForm(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
	}

	const result = formSchema.safeParse(data)

	return {
		loggedIn: result.success,
		...result.error?.flatten(),
	}
}
