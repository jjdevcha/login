"use server"

import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEX,
	PASSWORD_REGEX_ERROR,
} from "@/lib/constants"
import db from "@/lib/db"
import getSession from "@/lib/session"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import { z } from "zod"

const checkPasswords = ({
	password,
	confirm_password,
}: {
	password: string
	confirm_password: string
}) => {
	return password === confirm_password
}

const formSchema = z
	.object({
		username: z
			.string({
				invalid_type_error: "Username must be a string!",
				required_error: "Username is required!",
			})
			.toLowerCase()
			.trim(),
		email: z.string().email().toLowerCase(),
		password: z
			.string()
			.min(
				PASSWORD_MIN_LENGTH,
				"Password should be at least 10 characters long"
			)
			.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirm_password: z.string(),
	})
	.refine(checkPasswords, {
		message: "Passwords do not match!",
		path: ["confirm_password"],
	})
	.superRefine(async ({ username }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
			},
		})
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This username is already taken",
				path: ["username"],
				fatal: true,
			})
			return z.NEVER
		}
	})
	.superRefine(async ({ email }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		})
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This email is already taken",
				path: ["email"],
				fatal: true,
			})
			return z.NEVER
		}
	})

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirm_password: formData.get("confirm_password"),
	}
	const result = await formSchema.spa(data)
	if (!result.success) {
		console.log(result.error.flatten())
		return result.error.flatten()
	} else {
		const hashedPassword = await bcrypt.hash(result.data.password, 10)
		const user = await db.user.create({
			data: {
				username: result.data.username,
				email: result.data.email,
				password: hashedPassword,
			},
			select: {
				id: true,
			},
		})
		const session = await getSession()
		session.id = user.id
		await session.save()
		redirect("/")
	}
}
