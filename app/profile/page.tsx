import Button from "@/components/button"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

async function getUser() {
	const session = await getSession()
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		})
		if (user) {
			return user
		}
	}
	notFound()
}

export default async function Profile() {
	const user = await getUser()
	const logOut = async () => {
		"use server"
		const session = await getSession()
		session.destroy()
		redirect("/")
	}
	return (
		<div className="flex flex-col justify-center items-center w-full h-screen gap-4">
			<h1 className="text-2xl font-extrabold">Profile</h1>
			<h2>username: {user?.username}</h2>
			<h2>email: {user?.email}</h2>
			<form action={logOut}>
				<Button text="Log out" />
			</form>
		</div>
	)
}
