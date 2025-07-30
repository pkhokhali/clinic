import express from 'express';
import connect from './db/connect.js';
import Patient from './models/patient.js'; // Import the Patient model
const app = express();

app.use(express.json());
const port = 8080
connect();


// Patient.create({
//   firstName: 'Prabin',
//   lastName: 'Khokhali',
//   email: 'prabinkhokhali89@gmail.com',
//   phone: '9843172623',
//   dateOfBirth: new Date('1990-01-01'),
//   gender: 'Male',
//   address: {
//     street: 'Ramkot',
//     city: 'Kathmandu',
//   },
//   medicalHistory: ['No known allergies'],
//   });





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})