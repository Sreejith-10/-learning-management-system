import express from "express";
import {checkOutCourse, webHooks} from "../controllers/stripeController.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/checkout-course", checkOutCourse);
router.post("/hooks",bodyParser.raw({type:"*/*"}) , webHooks);

export {router as StripeRoute};
