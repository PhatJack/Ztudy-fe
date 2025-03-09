export function checkLastLogin(last_login : Date) {
	const lastLoginDate = new Date(last_login);
	const currentDate = new Date();
	const difference = currentDate.getTime() - lastLoginDate.getTime();
	const daysDifference = difference / (1000 * 3600 * 24);
	if (daysDifference < 7) {
		return true;
	}
	return false;
}