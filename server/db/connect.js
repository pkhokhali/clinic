import mongoose from 'mongoose'; //

const connect = async() => {
  const res = await mongoose.connect('mongodb://127.0.0.1:27017/ktmclinicdb');
  if(res) console.log('Connected to MongoDB')
  else console.log('Failed to connect to MongoDB');
  return res;
}
export default connect;