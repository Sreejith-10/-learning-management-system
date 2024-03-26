import axios from "axios";

export const addNewRole = async (value: string, id: string) => {
	try {
		const {data} = await axios.post(
			"/public/add-new-role",
			{
				id,
				role: value,
			},
			{headers: {"Content-Type": "application/json"}}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};
