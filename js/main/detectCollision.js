export const detectCollision = ({ rect1 = { x, y, width, height }, rect2 = { x, y, width, height } }) => {
	return (
		rect1.x + rect1.width >= rect2.x &&
		rect1.x <= rect2.x + rect2.width &&
		rect1.y <= rect2.y + rect2.height &&
		rect1.y + rect1.height >= rect2.y
	);
};
