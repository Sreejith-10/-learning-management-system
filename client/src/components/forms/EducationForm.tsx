import {month} from "@/constants/data";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {getYearArray} from "@/lib";
import {Plus, Trash2Icon, X} from "lucide-react";
import {useState} from "react";
import {SetState} from "@/lib/types";
import {useAppDispatch, useAppSelector} from "@/redux";
import {Checkbox} from "../ui/checkbox";
import {useToast} from "../ui/use-toast";
import axios from "axios";
import {updateUser} from "@/redux/authSlice";
import {updateData} from "@/redux/dataSlice";
import {addNewInstitute} from "@/lib/newInstitute";

const EducationForm = ({
	setShowEducationForm,
	itemIndex,
	setItemIndex,
}: {
	setShowEducationForm: SetState<boolean>;
	itemIndex: number | undefined;
	setItemIndex: SetState<number | undefined>;
}) => {
	const dispatch = useAppDispatch();

	const [hideEnd, setHideEnd] = useState<boolean>(false);
	const [searchInstitute, setSearchInstitute] = useState<string>("");
	const {publicData} = useAppSelector((state) => state.data);
	const {user} = useAppSelector((state) => state.auth);

	const {toast} = useToast();

	const [formData, setFormData] = useState({
		institute:
			typeof itemIndex === "number" ? user.education[itemIndex]?.institute : "",
		qualification:
			typeof itemIndex === "number"
				? user.education[itemIndex]?.qualification
				: "",
		startYear:
			typeof itemIndex === "number" ? user.education[itemIndex]?.startYear : "",
		startMonth:
			typeof itemIndex === "number"
				? user.education[itemIndex]?.startMonth
				: "",
		endYear:
			typeof itemIndex === "number" ? user.education[itemIndex]?.endYear : "",
		endMonth:
			typeof itemIndex === "number" ? user.education[itemIndex]?.endMonth : "",
		currentlyStudying:
			typeof itemIndex === "number"
				? user.education[itemIndex]?.currentlyStudying
				: "",
	});

	const years = getYearArray();

	const filteredInstitute = publicData?.institute
		?.filter((item) => {
			return item.toLowerCase().includes(searchInstitute.toLowerCase());
		})
		.sort();

	const addEducation = async () => {
		try {
			if (parseInt(formData.startYear) > parseInt(formData.endYear)) {
				toast({
					title: "Invalid Dates",
					description: "Your joing year and leaving year do not match up",
				});
				return;
			}
			if (parseInt(formData.startYear) === parseInt(formData.endYear)) {
				if (
					month.indexOf(formData.startMonth) > month.indexOf(formData.endMonth)
				) {
					toast({
						title: "Invalid Dates",
						description: "Your joing month and leaving month do not match up",
					});
					return;
				}
			}
			if (hideEnd) {
				setFormData({...formData, endMonth: "", endYear: ""});
			}

			const id = user.userId;
			const {data} = await axios.post(
				"/user/update-education",
				{
					formData,
					id,
				},
				{headers: {"Content-Type": "application/json"}}
			);
			dispatch(updateUser(data.user));
			setItemIndex(undefined);
			setShowEducationForm(false);
		} catch (error) {
			console.log(error);
		}
	};

	const removeItem = async () => {
		try {
			const id = user.education[itemIndex!]._id;
			const userId = user.userId;
			const {data} = await axios.delete(
				"/user/remove-education/" + id + "&" + userId
			);
			dispatch(updateUser(data.user));
			setItemIndex(undefined);
			setShowEducationForm(false);
		} catch (error) {
			console.log(error);
		}
	};

	const editEducation = async () => {
		try {
			if (parseInt(formData.startYear) > parseInt(formData.endYear)) {
				toast({
					title: "Invalid Dates",
					description: "Your joing year and leaving year do not match up",
				});
				return;
			}
			if (parseInt(formData.startYear) === parseInt(formData.endYear)) {
				if (
					month.indexOf(formData.startMonth) > month.indexOf(formData.endMonth)
				) {
					toast({
						title: "Invalid Dates",
						description: "Your joing month and leaving month do not match up",
					});
					return;
				}
			}
			if (hideEnd) {
				setFormData({...formData, endMonth: "", endYear: ""});
			}

			const id = user.education[itemIndex!]._id;
			const userId = user.userId;
			const {data} = await axios.patch(
				"/user/edit-education/",
				{
					formData,
					id,
					userId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			dispatch(updateUser(data.user));
			setItemIndex(undefined);
			setShowEducationForm(false);
		} catch (error) {
			console.log(error);
		}
	};

	const addInstitute = async () => {
		const id = publicData._id;
		const instituteName = searchInstitute;

		const response = await addNewInstitute(instituteName, id);
		dispatch(updateData(response.names[0]));
	};

	return (
		<div className="w-full sm:w-screen h-screen absolute top-0 left-0 sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] flex items-center justify-center bg-[rgba(0,0,0,.5)]">
			<div className="w-[500px] bg-white rounded-md shadow-md p-4">
				<div className="w-full h-auto text-blue-500 flex items-center justify-end gap-2">
					Close{" "}
					<X
						size={30}
						className="text-blue-500"
						onClick={() => {
							setItemIndex(undefined);
							setShowEducationForm(false);
						}}
					/>
				</div>
				<div className="w-full h-auto p-3">
					<h3 className="font-semibold text-lg">Education</h3>
					<p className="font-medium text-sm text-slate-600">
						Add your educational background to let employers know where you
						studied or are currenlty studying. Even if you didn't finish,it's
						important to include it here. And if you've earned a college
						degree., you don't need to add your high school/GED. All fields are
						optional
					</p>
				</div>
				<div className="w-full h-auto p-3 space-y-4">
					<div className="w-full space-y-3">
						<Label className="text-sm font-semibold">
							Name of the institution
						</Label>
						<Select
							value={formData.institute}
							onValueChange={(value) => {
								setFormData({...formData, institute: value});
							}}>
							<SelectTrigger>
								<SelectValue placeholder="Select an institution" />
							</SelectTrigger>
							<SelectContent>
								<Input
									placeholder="Type to search"
									className="focus-visible:outline-none focus-visible:ring-0"
									onChange={(e) => setSearchInstitute(e.target.value)}
								/>

								{filteredInstitute?.length === 0 && (
									<Label
										onClick={addInstitute}
										className="font-semibold cursor-pointer flex items-center justify-center gap-5 py-3 text-blue-600">
										<Plus /> Add {searchInstitute}
									</Label>
								)}
								{filteredInstitute?.map((j, idx) => (
									<SelectItem value={j} key={idx}>
										{j}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full space-y-3">
						<Label className="text-sm font-semibold">Qualification</Label>
						<Select
							value={formData.qualification}
							onValueChange={(value) => {
								setFormData({...formData, qualification: value});
							}}>
							<SelectTrigger>
								<SelectValue placeholder="Select a your qualification" />
							</SelectTrigger>
							<SelectContent className="flex gap-5">
								{publicData.qualification?.map((j, idx) => (
									<SelectItem value={j} key={idx}>
										{j}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="w-full h-auto p-3 space-y-3">
					<h3 className="font-semibold text-lg">Start date</h3>
					<Select
						value={formData.startMonth}
						onValueChange={(value) => {
							setFormData({...formData, startMonth: value});
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select month" />
						</SelectTrigger>
						<SelectContent>
							{month.map((m, idx) => (
								<SelectItem key={idx} value={m}>
									{m}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						value={formData.startYear}
						onValueChange={(value) => {
							setFormData({...formData, startYear: value});
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select Year" />
						</SelectTrigger>
						<SelectContent>
							{years.map((y, idx) => (
								<SelectItem key={idx} value={y.toString()}>
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="w-full h-auto p-3 space-y-3">
					<h3 className="font-semibold text-lg">End date</h3>
					<Select
						disabled={hideEnd}
						value={formData.endMonth}
						onValueChange={(value) => {
							setFormData({...formData, endMonth: value});
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select month" />
						</SelectTrigger>
						<SelectContent>
							{month.map((m, idx) => (
								<SelectItem key={idx} value={m}>
									{m}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						disabled={hideEnd}
						value={formData.endYear}
						onValueChange={(value) => {
							setFormData({...formData, endYear: value});
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select Year" />
						</SelectTrigger>
						<SelectContent>
							{years.map((y, idx) => (
								<SelectItem key={idx} value={y.toString()}>
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<span className="w-full h-auto flex items-start justify-start gap-5 pl-3 pb-4">
					<h3 className="text-sm font-semibold">I currently study here</h3>
					<Checkbox
						value={formData.currentlyStudying.toString()}
						onCheckedChange={(val: boolean) => {
							setHideEnd(val);
							setFormData({...formData, currentlyStudying: val});
						}}
					/>
				</span>
				<span className="w-full">
					<Button
						onClick={removeItem}
						className="float-left bg-destructive hover:bg-destructive/80 flex gap-2">
						<Trash2Icon />
						Remove
					</Button>
					{typeof itemIndex === "number" ? (
						<Button
							onClick={editEducation}
							className="float-right bg-blue-600 hover:bg-blue-500">
							Update
						</Button>
					) : (
						<Button
							onClick={addEducation}
							className="float-right bg-blue-600 hover:bg-blue-500">
							Save
						</Button>
					)}
				</span>
			</div>
		</div>
	);
};
export default EducationForm;
