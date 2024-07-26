import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Mongo db conectado");
  } catch (error) {
    console.log(`Ocorreu um erro ao conectar ao banco ${error}`);
    process.exit(1);
  }
};

export default connectDB;
