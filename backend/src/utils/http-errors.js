export function createHttpError(message, statusCode) {
	const err = new Error(message)
	err.statusCode = statusCode
	return err
}
