import mongoose from "mongoose";
const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  screenshot: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  lindkenIn: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
});
const company = mongoose.model("post", companySchema);
export default company;
