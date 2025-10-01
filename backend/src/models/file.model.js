import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['file', 'folder'], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
  content: { type: String, default: '' }, // only used if type === 'file'
  language: { type: String, default: '' },
},{timestamps:true});

const File = mongoose.model('File', fileSchema);
export default File;