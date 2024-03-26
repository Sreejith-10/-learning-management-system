import React, {CSSProperties, ReactNode} from "react";

type PageWrapperProps = {
	children: ReactNode;
	style?: CSSProperties;
};

const PageWrapper: React.FC<PageWrapperProps> = ({children, style}) => {
	return (
		<div
			className="mx-[15%] xl:mx-[5%] sm:mx-[5%] lg:mx-[10%] w-auto h-auto lg:h-full flex"
			style={style}>
			{children}
		</div>
	);
};

export default PageWrapper;
