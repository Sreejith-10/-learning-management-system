import express, {Router} from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./db/connect.js";
import cookieParser from "cookie-parser";
import {AuthRouter} from "./routes/authRoute.js";
import {CourseRouter} from "./routes/courseRoute.js";
import {InstructorRouter} from "./routes/instructorRoute.js";
import {publicDataRouter} from "./routes/publicDataRoute.js";
import {UserRoter} from "./routes/userRoute.js";
import {ReviewRouter} from "./routes/reviewRoute.js";
import {StripeRoute} from "./routes/stripeRoute.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;


//cors
app.use(
	cors({
		origin: process.env.FRONT_END,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	})
);

//databse
database;

//middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use("/auth", AuthRouter);
app.use("/course", CourseRouter);
app.use("/instructor", InstructorRouter);
app.use("/public", publicDataRouter);
app.use("/user", UserRoter);
app.use("/review", ReviewRouter);
app.use("/stripe", StripeRoute);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
