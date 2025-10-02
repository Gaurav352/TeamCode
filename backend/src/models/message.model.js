import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  attachment:{type:String},
},{timestamps:true});

const Message = mongoose.model('Message', messageSchema);
export default Message;