export function generateSoftHexColor() : string {
	// Soft color range (higher than 100 to avoid very dark colors, lower than 230 to avoid very bright colors)
	const min = 100;
	const max = 230;

	const r = Math.floor(Math.random() * (max - min) + min);
	const g = Math.floor(Math.random() * (max - min) + min);
	const b = Math.floor(Math.random() * (max - min) + min);

	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
