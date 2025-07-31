import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['SuperAdmin','Admin','Doctor','Patient'] }, // Default role is Admin
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password will be stored
  permissions: [{
    type: String,
    enum: ['manageDoctors', 'managePatients', 'manageAppointments', 'manageBilling', 'manageInventory', 'viewReports'],
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
