"use client"

import { useFormStatus } from "react-dom"

interface ButtonProps {
	text: string
}

export default function Button({ text }: ButtonProps) {
	const { pending } = useFormStatus()
	return (
		<button
			disabled={pending}
			className="p-2 h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed bg-orange-500 text-white rounded-md">
			{pending ? "Loading..." : text}
		</button>
	)
}
