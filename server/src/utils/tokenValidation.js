import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const tokenValidation = (token) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	return decoded;
};
