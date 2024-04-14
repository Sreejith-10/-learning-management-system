import {EmailValidation} from "../utils/emailValidation.js";
import bcrypt from "bcrypt";
import jwt, {decode} from "jsonwebtoken";
import AuthModel from "../models/authModel.js";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";
import {tokenValidation} from "../utils/tokenValidation.js";
import nodemailer from "nodemailer";

dotenv.config();

export const userRegister = async (req, res) => {
	try {
		const {fname, lname, email, password} = req.body;
		const user = await AuthModel.findOne({email: email});
		if (user) {
			return res.status(409).json({message: "Email already exists"});
		}
		const validEmail = EmailValidation(email);
		if (!validEmail) {
			return res.status(400).json({message: "Provide a valid email"});
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = await bcrypt.hashSync(password, salt);
		const auth = await AuthModel.create({
			fname: fname,
			lname: lname,
			email: email,
			password: hash,
			role: "User",
		});

		await UserModel.create({
			userId: auth._id,
			userEmail: auth.email,
			userName: auth.fname + " " + auth.lname,
		});

		return res.status(200).json({message: "Account created for succesfully"});
	} catch (error) {
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const userLogin = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await AuthModel.findOne({email: email});
		if (!user) {
			return res.status(404).json({message: "User not found"});
		}
		bcrypt.compare(password, user.password, (err, data) => {
			if (data) {
				jwt.sign(
					{email: user.email, id: user._id, role: user.role},
					process.env.JWT_SECRET,
					(err, token) => {
						if (token) {
							return res
								.cookie("token", token, {
									maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
								})
								.status(200)
								.json({message: "Login succesfull", token, user});
						} else {
							return res
								.status(500)
								.json({message: "Something went wrong", err});
						}
					}
				);
			} else {
				return res.status(400).json({message: "Wrong password", err});
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const googleLogin = async (req, res) => {
	try {
		const {accessToken} = req.body;

		await fetch(
			`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
			}
		)
			.then((res) => res.json())
			.then(async (data) => {
				const useExist = await UserModel.findOne({userEmail: data.email});
				if (!useExist) {
					return res.status(409).json({message: "User not found"});
				}

				const user = await UserModel.findOne({userEmail: data.email});

				jwt.sign(
					{email: user.email, id: user._id, role: user.role},
					process.env.JWT_SECRET,
					(err, token) => {
						if (token) {
							return res
								.cookie("token", token, {
									maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
								})
								.status(200)
								.json({message: "Login succesfull", token, user});
						} else {
							return res
								.status(500)
								.json({message: "Something went wrong", err});
						}
					}
				);
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
export const googleSignUp = async (req, res) => {
	try {
		const {accessToken} = req.body;

		await fetch(
			`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
			{
				method: "GET",
				mode: "cors",
				credentials: "same-origin",
			}
		)
			.then((res) => res.json())
			.then(async (data) => {
				const useExist = await UserModel.findOne({userEmail: data.email});
				if (useExist) {
					return res
						.status(409)
						.json({message: "User already exists please login"});
				}

				const u = await AuthModel.create({
					email: data.email,
					fname: data.given_name,
					lname: data.family_name,
					role: "User",
				});
				const user = await UserModel.create({
					userId: u._id,
					userName: data.name,
					userEmail: data.email,
					profileImage: data.picture,
				});

				jwt.sign(
					{email: user.email, id: user._id, role: user.role},
					process.env.JWT_SECRET,
					(err, token) => {
						if (token) {
							return res
								.cookie("token", token, {
									maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
								})
								.status(200)
								.json({message: "Login succesfull", token, user});
						} else {
							return res
								.status(500)
								.json({message: "Something went wrong", err});
						}
					}
				);
			});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const validateToken = async (req, res) => {
	const token = req.body.token;
	if (!token) {
		return res.status(401).json({message: "Not token provided"});
	}

	const decoded = tokenValidation(token);

	if (decoded) {
		try {
			const user = await AuthModel.findOne({email: decoded.email});
			user.password = undefined;
			return res.json({valid: true, user: user});
		} catch (error) {
			return res.status(500).json({message: "Something went wrong"});
		}
	}
};

export const userLogut = async (req, res) => {
	return res.cookie("token", "", {maxAge: 1}).json({message: "User Logut"});
};

export const createAdmin = async (req, res) => {
	try {
		const {name, email, password} = req.body;
		const user = await AuthModel.findOne({email: email});
		if (user) {
			return res.status(409).json({message: "Email already exists"});
		}
		const validEmail = EmailValidation(email);
		if (!validEmail) {
			return res.status(400).json({message: "Provide a valid email"});
		}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const auth = await AuthModel.create({
			name: name,
			email: email,
			password: hash,
			role: "Admin",
		});

		return res
			.status(200)
			.json({message: "Account created for succesfully", user: auth});
	} catch (error) {
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const adminLogin = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await AuthModel.findOne({email});

		if (!user) {
			return res.status(404).json({message: "User not found"});
		}

		if (user.role !== "Admin") {
			return res.status(401).json({message: "Not Authorized"});
		}
		bcrypt.compare(password, user.password, (err, data) => {
			if (data) {
				jwt.sign(
					{email: user.email, id: user._id, role: user.role},
					process.env.JWT_SECRET,
					(err, token) => {
						if (token) {
							return res
								.cookie("token", token, {
									maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
								})
								.status(200)
								.json({message: "Login succesfull", token, user});
						} else {
							return res
								.status(500)
								.json({message: "Something went wrong", err});
						}
					}
				);
			} else {
				return res.status(400).json({message: "Wrong password", err});
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const verifyUser = async (req, res) => {
	try {
		const token = req.params.token;

		if (token === "undefined") {
			return res.status(403).json({message: "Not token provided"});
		}

		const decoded = tokenValidation(token);

		if (decoded) {
			const user = await AuthModel.findById(decoded.id);

			if (!user) {
				return res.status(404).json({message: "User not found"});
			}

			if (user.role === "User") {
				return res
					.status(401)
					.json({message: "User is unauthorized", valid: false});
			}
			return res.status(200).json({message: "Authorized", valid: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const sendPasswordResetToEmail = async (req, res) => {
	try {
		const mail = req.body.email;

		const user = await AuthModel.findOne({email: mail});

		if (!user) {
			return res.status(404).json({message: "User not found"});
		} else {
			const token = jwt.sign(
				{id: user._id, email: user.email},
				process.env.JWT_SECRET,
				{expiresIn: "1d"}
			);

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "beastop76@gmail.com",
					pass: "azdm sbsb tpze wipg",
				},
			});

			const mailOptions = {
				from: "beastop76@gmail.com",
				to: mail,
				subject: "Secretly Password reset",
				text: `http://localhost:5173/reset-password/${user._id}/${token}`,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
					return res.status(200).json({message: "Email sent"});
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};

export const resetPassword = async (req, res) => {
	try {
		const {id, token} = req.params;
		const {password} = req.body;

		jwt.verify(token, process.env.JWT_SECRET, async (err, _decoded) => {
			if (err) {
				return res.status(400).json({message: "Invaild token"});
			} else {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);

				await AuthModel.findByIdAndUpdate({_id: id}, {password: hash});

				return res.status(200).json({message: "Password updated"});
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "Something went wrong"});
	}
};
