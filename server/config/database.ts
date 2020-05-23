import * as mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🍃️ Connected to MongoDB');
  } catch (e) {
    throw e;
  }
};
