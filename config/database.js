import mongoose from "mongoose";

const setConnection = async () => {
  let db =
    "mongodb+srv://MovingWorlds:PtY1wwSq834Jjc2U@cluster0.uxoql.mongodb.net/MovingWorlds?retryWrites=true&w=majority";
  try {
    await mongoose.connect(db, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};
const database = {
  setConnection: setConnection,
};

export default database;
