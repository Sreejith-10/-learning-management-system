import {Search} from "lucide-react";
import {Input} from "./input";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/redux";
import {updateSearchKey} from "@/redux/courseSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {CourseType} from "@/lib/types";

const SearchBox = () => {
	const [searchKey, setSearchKey] = useState("");
	const [names, setNames] = useState([""]);
	const [list, setList] = useState<string[]>([]);
	// const [show, setShow] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		try {
			axios.get("/course/get-courses").then(({data}) => {
				const course = data.course;
				const name = course.map((item: CourseType) => item.courseName);
				setNames(name);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			dispatch(updateSearchKey(searchKey));
			navigate("/search");
		}
	};

	const searchCourse = (key: string) => {
		dispatch(updateSearchKey(key));
		navigate("/search");
	};

	useEffect(() => {
		const renderList = () => {
			const lists = names.filter((item) => {
				if (searchKey === "") return null;
				return item.toLowerCase().includes(searchKey.toLowerCase().trim());
			});
			setList(lists);
		};
		renderList();
	}, [names, searchKey]);

	const clickHandler = (item: string) => {
		searchCourse(item);
		setSearchKey(item);
		setList([]);
	};

	return (
		<div className="sm:w-full sm:h-auto sm:relative">
			<div>
				<Input
					className="text-[15px] font-semibold dark:bg-slate-800"
					value={searchKey}
					onKeyDown={onKeyDownHandler}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchKey(e.target.value);
						// renderList();
					}}
				/>
				<Search className="bg-blue-700 h-8 w-8 p-1 rounded-md absolute right-2 top-1/2 translate-y-[-50%] text-white" />
			</div>
			{list.length > 0 && (
				<div className="w-full h-auto bg-slate-50 dark:bg-slate-900 rounded-md shadow-xl absolute mt-5">
					<ul className="w-full h-full py-2 px-3 space-y-4">
						{list.map((item, index) => (
							<li
								onClick={() => clickHandler(item)}
								className="font-[600] cursor-pointer"
								key={index}>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SearchBox;
