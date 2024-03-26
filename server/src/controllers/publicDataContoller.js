import PublicModel from "../models/publicModel.js";

export const getDatas = async (req, res) => {
	try {
		const data = await PublicModel.find();
		if (data) {
			return res.status(200).json({data});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const addNewRole = async (req, res) => {
	try {
		const {id, role} = req.body;
		await PublicModel.findOneAndUpdate(
			{_id: id},
			{$addToSet: {jobRoles: role}}
		);
		const newData = await PublicModel.find();
		if (newData) {
			return res.status(201).json({message: "Success", names: newData});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const addNewCompany = async (req, res) => {
	try {
		const {id, companyName} = req.body;

		await PublicModel.findOneAndUpdate(
			{_id: id},
			{$addToSet: {companies: companyName}}
		);
		const newCompany = await PublicModel.find();
		if (newCompany) {
			return res.status(201).json({message: "Success", names: newCompany});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const addnewInstitute = async (req, res) => {
	try {
		const {id, instituteName} = req.body;
		await PublicModel.findOneAndUpdate(
			{_id: id},
			{$addToSet: {institute: instituteName}}
		);
		const newData = await PublicModel.find();
		if (newData) {
			return res.status(201).json({message: "Success", names: newData});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
