import {SetState} from "@/lib/types";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {Plus, X} from "lucide-react";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux";
import axios from "axios";
import {updateUser} from "@/redux/authSlice";
import {addNewRole} from "@/lib/newRole";
import {updateData} from "@/redux/dataSlice";

const WorkPreferenceForm = ({
	setShowWorkForm,
}: {
	setShowWorkForm: SetState<boolean>;
}) => {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector((state) => state.auth);

	const [jobkey, setJobkey] = useState<string>("");
	const [insdustryKey, setInsdustryKey] = useState<string>("");

	const [workPreferenceData, setWorkPrefrenceData] = useState({
		role: user.workPreference.role,
		industry: user.workPreference.industry,
		remote: user.workPreference.workRemote || "",
		relocation: user.workPreference.relocate || "",
	});

	const {publicData} = useAppSelector((state) => state.data);

	const filteredRoles = publicData?.jobRoles
		?.filter((item) => {
			return item.toLowerCase().includes(jobkey.toLowerCase());
		})
		.sort();

	const filteredInsdustry = publicData?.industry
		?.filter((item) => {
			return item.toLowerCase().includes(insdustryKey.toLowerCase());
		})
		.sort();

	const saveData = async () => {
		try {
			const id = user.userId;
			const {data} = await axios.post(
				"/user/update-workpreference",
				{workPreferenceData, id},
				{headers: {"Content-Type": "application/json"}}
			);
			dispatch(updateUser(data.user));
			setShowWorkForm(false);
		} catch (error) {
			console.log(error);
		}
	};

	const addRole = async () => {
		const id = publicData._id;
		const role = jobkey;

		const response = await addNewRole(role, id);
		dispatch(updateData(response.names[0]));
	};

	return (
		<div className="w-full sm:w-screen h-screen absolute top-0 left-0 sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] flex items-center justify-center bg-[rgba(0,0,0,.5)]">
			<div className="w-[500px] bg-white rounded-md shadow-md p-4 z-40">
				<div
					onClick={() => setShowWorkForm(false)}
					className="w-full h-auto text-blue-500 cursor-pointer flex items-center justify-end gap-2">
					Close <X size={30} className="text-blue-500" />
				</div>
				<div className="w-full h-auto p-3">
					<h3 className="font-semibold text-lg">Work Preferences</h3>
					<p className="font-medium text-sm text-slate-600">
						Lets recruiter know what role you're looking for to make sure you
						find oppertunities that are right for you
					</p>
				</div>
				<div className="w-full h-auto p-3 space-y-4">
					<div className="w-full space-y-3">
						<Label className="text-sm font-semibold">
							What role are you looking for ?
						</Label>
						<Select
							value={workPreferenceData.role}
							onValueChange={(value) =>
								setWorkPrefrenceData({...workPreferenceData, role: value})
							}>
							<SelectTrigger>
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								<Input
									onChange={(e) => setJobkey(e.target.value)}
									placeholder="Search your role"
									className="ocus-visible:outline-none focus-visible:ring-0"
								/>
								{filteredRoles.length === 0 && (
									<Label
										onClick={addRole}
										className="font-semibold cursor-pointer flex items-center justify-center gap-5 py-3">
										<Plus /> Add {jobkey}
									</Label>
								)}
								{filteredRoles?.map((data, idx) => (
									<SelectItem value={data} key={idx}>
										{data}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="w-full space-y-3">
						<Label className="text-sm font-semibold">Insudtry</Label>
						<Select
							value={workPreferenceData.industry}
							onValueChange={(value) =>
								setWorkPrefrenceData({...workPreferenceData, industry: value})
							}>
							<SelectTrigger>
								<SelectValue placeholder="Select an Insudtry" />
							</SelectTrigger>
							<SelectContent>
								<Input
									onChange={(e) => setInsdustryKey(e.target.value)}
									placeholder="Search industry"
									className="ocus-visible:outline-none focus-visible:ring-0"
								/>
								{filteredInsdustry.length === 0 && (
									<Label className="font-semibold cursor-pointer flex items-center justify-center gap-5 py-3">
										<Plus /> Add {insdustryKey}
									</Label>
								)}
								{filteredInsdustry.map((item, idx) => (
									<SelectItem value={item} key={idx}>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="w-full h-auto p-3 space-y-3">
					<h3 className="font-semibold text-lg">
						Are you open to working remotely ?
					</h3>
					<RadioGroup
						onValueChange={(value) =>
							setWorkPrefrenceData({...workPreferenceData, remote: value})
						}
						className="w-full h-auto flex items-center justify-center p-2">
						<div className="w-1/2 h-auto space-x-4 flex items-center justify-center">
							<RadioGroupItem value={"yes"} />
							<Label className="font-semibold">Yes</Label>
						</div>
						<div className="w-1/2 h-auto space-x-4 flex items-center justify-center">
							<RadioGroupItem value={"no"} />
							<Label className="font-semibold">No</Label>
						</div>
					</RadioGroup>
				</div>
				<div className="w-full h-auto p-3 space-y-3">
					<h3 className="font-semibold text-lg">
						Are you willing to relocate within your home country ?
					</h3>
					<RadioGroup
						onValueChange={(value) =>
							setWorkPrefrenceData({...workPreferenceData, relocation: value})
						}
						className="w-full h-auto flex items-center justify-center p-2">
						<div className="w-1/2 h-auto space-x-4 flex items-center justify-center">
							<RadioGroupItem value={"yes"} />
							<Label className="font-semibold">Yes</Label>
						</div>
						<div className="w-1/2 h-auto space-x-4 flex items-center justify-center">
							<RadioGroupItem value={"no"} />
							<Label className="font-semibold">No</Label>
						</div>
					</RadioGroup>
				</div>
				<span className="w-full">
					<Button
						onClick={saveData}
						className="float-right bg-blue-600 hover:bg-blue-500">
						Save
					</Button>
				</span>
			</div>
		</div>
	);
};

export default WorkPreferenceForm;
