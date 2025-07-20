const COLORS = ['ffb703', '219ebc', '8ecae6', '023047', 'fb8500', '06d6a0'];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const getAvatarUrl = (name: string) => {
	const bgColor = getRandomColor();
	return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
		name
	)}&size=128&backgroundColor=${bgColor}&radius=50`;
};
