import {OAuth2Client} from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"postMessage"
);

export const getPrfoileInfo = async (code) => {
	const r = await client.getToken(code);
	const idToken = r.tokens.id_token;

	const ticket = client.verifyIdToken({
		idToken,
		audience: process.env.GOOGLE_CLIENT_ID,
	});

	const payload = ticket.getPayload();

	return payload;
};
