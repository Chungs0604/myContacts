const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Contact", schema);
