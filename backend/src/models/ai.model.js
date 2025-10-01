import mongoose from 'mongoose';

const AISchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true }
},{timestamps:true});
const AI = mongoose.model('AI', AISchema);
export default AI;