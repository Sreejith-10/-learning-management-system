import axios from "axios";

export const addNewCompany = async (value: string, id: string) => {
	try {
		const {data} = await axios.post(
			"/public/add-new-company",
			{
				id,
				companyName: value,
			},
			{headers: {"Content-Type": "application/json"}}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};
