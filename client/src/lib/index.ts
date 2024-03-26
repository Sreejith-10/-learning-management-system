export const getYearArray = () :number[] => {
	const currentYear = new Date().getFullYear();

	const years = [];

	for (let year = currentYear; year >= 1900; year--) {
		years.push(year);
	}

	return years;
};
