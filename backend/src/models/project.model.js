import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,default:''}],
  files: [{
    type:mongoose.Schema.Types.ObjectId,ref:'File'
  }],
},{timestamps:true});

const Project = mongoose.model('Project', projectSchema);
export default Project;