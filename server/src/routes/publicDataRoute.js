import express from "express";
import {
	addNewCompany,
	addNewRole,
	addnewInstitute,
	getDatas,
} from "../controllers/publicDataContoller.js";

const router = express.Router();

router.get("/get-data", getDatas);
router.post("/add-new-role", addNewRole);
router.post("/add-new-company", addNewCompany);
router.post("/add-new-institute", addnewInstitute);

export {router as publicDataRouter};
