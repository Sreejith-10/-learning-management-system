export const changeFilePath = (file) => {
	const p = file.path.replace(/\\/g, "/");
	return p;
};
