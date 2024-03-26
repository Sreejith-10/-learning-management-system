import axios from "axios";

export const addNewInstitute = async (value: string, id: string) => {
	try {
		const {data} = await axios.post(
			"/public/add-new-institute/",
			{
				id,
				instituteName: value,
			},
			{headers: {"Content-Type": "application/json"}}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};
