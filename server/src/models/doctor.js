
import mongoose from 'mongoose';
const { Schema } = mongoose;

const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialty: { type: String, required: true }, // e.g., Cardiologist, General Practitioner
  licenseNumber: { type: String, required: true, unique: true },
  availability: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: { type: String }, // e.g., "09:00"
    endTime: { type: String },   // e.g., "17:00"
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;