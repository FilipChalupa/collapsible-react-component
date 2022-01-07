export const assertNever = (_: never) => {
	throw new Error(JSON.stringify(_))
}
