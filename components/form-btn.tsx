"use client"

import { useFormStatus } from "react-dom"

interface FormButtonProps {
	text: string
}

export default function FormButton({ text }: FormButtonProps) {
	const { pending } = useFormStatus()
	return (
		<button
			disabled={pending}
			className="h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed bg-orange-500 text-white rounded-md">
			{pending ? "Loading..." : text}
		</button>
	)
}
