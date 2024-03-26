import {useEffect, useState} from "react";

export const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<string | null>(null);

	useEffect(() => {
		let lastScrollY = window.pageYOffset;

		const updateScrollDirection = () => {
			const scrollY = window.pageYOffset;
			const direction: string = scrollY > lastScrollY ? "down" : "up";
			if (
				direction !== scrollDirection &&
				(scrollY - lastScrollY > 50 || scrollY - lastScrollY < -50)
			) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		window.addEventListener("scroll", updateScrollDirection);

		return () => {
			window.removeEventListener("scroll", updateScrollDirection);
		};
	}, [scrollDirection]);

	return scrollDirection;
};
