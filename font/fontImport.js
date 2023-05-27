export const fontExport = () => {
	fetch('../font/ConcertOne-Regular.ttf')
		.then(resp => resp.arrayBuffer())
		.then(font => {
			const fontFace = new FontFace('Concert One', font);
			document.fonts.add(fontFace);
		});
};
