import Input from "@/components/input"
import db from "@/lib/db"

async function getUser(username: string) {
	const user = await db.user.findUnique({
		where: {
			username,
		},
	})
	if (user) {
		return user
	}
}

export default async function editProfile({
	params,
}: {
	params: { username: string }
}) {
	const username = params.username
	const user = await getUser(username)

	return (
		<div>
			<h1>Edit Profile</h1>
			<form>
				<label>
					Username
					<Input name="username" type="text" value={user?.username} />
				</label>
				<label>
					Email
					<Input
						name="email"
						type="text"
						value={user?.email || undefined}
					/>
				</label>
				<label>
					Password
					<Input
						name="password"
						type="text"
						placeholder="New password"
					/>
				</label>
				<label>
					Bio
					<Input
						name="bio"
						type="text"
						value={user?.bio || undefined}
					/>
				</label>

				<button type="submit">Save</button>
			</form>
		</div>
	)
}
