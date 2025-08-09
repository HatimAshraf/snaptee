import dotenv from "dotenv";

import connectdb from "./db/index.js";

dotenv.config();

connectdb();

/*
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.error("error: ", err);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server started at ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("error: ", error);
    throw err;
  }
})();
*/
