const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: false, },
  notes: { type: String, required: false, },
  memories: { type: String, required: false, },
  dateOfLastContact: { type: Date, required: true, },
  association: { type: String, enum: ['UK', 'Family', 'Army', 'Arizona State', 'Boston'], required: true, },
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contacts: [contactSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;