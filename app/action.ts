"use server"

import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants"
import {z} from "zod"

export async function handleForm(prevState: any, formData: FormData) {
	console.log(prevState)
	await new Promise((resolve) => setTimeout(resolve, 3000))

	const password = formData.get("password")

	if (password === "12345") {
		return {
			success: true,
			message: "Login successful",
		}
	} else {
		return {
			errors: ["wrong password"],
		}
	}
}
