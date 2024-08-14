"use client"

import { useFormStatus } from "react-dom"

interface ButtonProps {
	text: string
	onClick?: () => void
}

export default function Button({ text, onClick }: ButtonProps) {
	const { pending } = useFormStatus()
	return (
		<button
			onClick={onClick}
			disabled={pending}
			className="p-2 h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed bg-orange-500 text-white rounded-md">
			{pending ? "Loading..." : text}
		</button>
	)
}
