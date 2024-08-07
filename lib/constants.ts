export const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9._]+@zod\.com$/)
export const EMAIL_REGEX_ERROR = "Only @zod.com emails are allowed"
export const USERNAME_MIN_LENGTH = 5
export const PASSWORD_MIN_LENGTH = 10
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d)/)
export const PASSWORD_REGEX_ERROR =
	"Passwords must contain at least one numbers"
