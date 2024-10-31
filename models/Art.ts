import mongoose from 'mongoose';

const ArtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add a Title'],
    trim: true,
  },
  imageUrl: [
    {
      url: String,
      filename: String,
    },
  ],
});

export default mongoose.models.Art || mongoose.model('Art', ArtSchema);
