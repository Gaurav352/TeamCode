import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  text: { type: String },
  attachmen:{type:String},
},{timestamps:true});

const Message = mongoose.model('Message', messageSchema);
export default Message;