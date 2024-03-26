import {useEffect, useState} from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./breadcrumb";
import {Slash} from "lucide-react";
import {Link} from "react-router-dom";

const Links = () => {
	const [paths, setPaths] = useState<string[]>([]);

	useEffect(() => {
		const uri = location.pathname;
		const s = uri.split("/").filter(Boolean);
		setPaths(s);
	}, [location.pathname]);

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList className="flex items-center">
					<BreadcrumbItem>
						<BreadcrumbLink>
							<Link to={"/"}>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					{paths?.map((path, index) => (
						<div key={index} className="flex items-center gap-4">
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink>
									{paths.length > 1 ? <Link to={path}>{path}</Link> : path}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</div>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default Links;
