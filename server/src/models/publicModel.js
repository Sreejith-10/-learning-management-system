import mongoose, {mongo} from "mongoose";

const publicSchema = new mongoose.Schema({
	companies: [String],
	jobRoles: [String],
	industry: [String],
	institute: [String],
	qualification: [String],
});

const PublicModel = mongoose.model("publicData", publicSchema);

export default PublicModel;
