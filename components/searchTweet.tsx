import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "./button"
import Input from "./input"

export default function SearchTweet() {
	const [search, setSearch] = useState("")
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(`/search?q=${encodeURIComponent(search)}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="text"
				name="search"
				placeholder="Search for a tweet"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				required
			/>
			<Button text="Search" />
		</form>
	)
}
