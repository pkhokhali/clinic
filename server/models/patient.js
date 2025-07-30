import mongoose from 'mongoose';
const { Schema } = mongoose;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: {
    street: { type: String },
    city: { type: String },
  },
  medicalHistory: [{ type: String }], // Array of medical conditions or notes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Patient = mongoose.model('Patient', patientSchema);

export default Patient;