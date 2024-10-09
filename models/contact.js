const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: false, },
  notes: { type: String, required: false, },
  memories: { type: String, required: false, },
  dateOfLastContact: { type: Date, required: true, },
  association: { type: String, required: true, },
});
