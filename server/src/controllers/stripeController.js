import dotenv from "dotenv";
import stripe from "stripe";
import UserModel from "../models/userModel.js";
import CourseModel from "../models/courseModel.js";

dotenv.config();

const stripeInstance = stripe(process.env.STRIPE_SECRET);

export const checkOutCourse = async (req, res) => {
	try {
		const {course, user} = req.body;

		const data = await UserModel.findOne({userId: user});

		const courseIsPresent = data.courses.some(
			(item) => item.courseId === course._id
		);
		if (courseIsPresent) {
			return res
				.status(400)
				.json({message: "You already purchased the course"});
		}

		const customer = await stripeInstance.customers.create({
			metadata: {
				userid: user,
				courseId: course._id,
			},
		});

		const lineItems = {
			price_data: {
				currency: "usd",
				product_data: {
					name: course.courseName,
				},
				unit_amount: parseInt(course.coursePrice),
			},
			quantity: 1,
		};

		const session = await stripeInstance.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [lineItems],
			customer: customer.id,
			mode: "payment",
			success_url: `http://localhost:5173/success`,
			cancel_url: "http://localhost:5173/cancel",
		});

		res.json({id: session.id});
	} catch (error) {
		console.log(error.message);
		console.log(error);
	}
};
export const webHooks = async (req, res) => {
	const payload = req.body;
	const sig = req.headers["stripe-signature"];
	const payloadString = JSON.stringify(payload, null, 2);
	const secret =
		"whsec_f836b5b3932867ec2d90e08873c8afa363ddd807e40aa294a97d3bef24e0a9d6";

	const header = stripe.webhooks.generateTestHeaderString({
		payload: payloadString,
		secret,
	});

	let data;
	let eventType;

	if (secret) {
		let event;
		try {
			event = stripeInstance.webhooks.constructEvent(
				payloadString,
				header,
				secret
			);
		} catch (err) {
			console.log(err.message);
			res.status(400).send(`Webhook Error: ${err.message}`);
		}
		if (event) {
			data = event.data.object;
			eventType = event.type;
		}
	} else {
		data = req.body.data.object;
		eventType = req.body.type;
	}

	// Handle the event
	if (eventType === "checkout.session.completed") {
		stripeInstance.customers
			.retrieve(data.customer)
			.then(async (customer) => {
				const userId = customer.metadata.userid;
				const courseId = customer.metadata.courseId;
				await UserModel.findOneAndUpdate(
					{userId: userId},
					{$addToSet: {courses: {courseId: courseId}}}
				);
				await CourseModel.findOneAndUpdate(
					{_id: courseId},
					{$inc: {studentsEnrolled: 1}}
				);
			})
			.catch((err) => console.log(err.message));
	}

	// Return a res to acknowledge receipt of the event
	res.json({received: true});
};
