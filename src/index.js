import dotenv from "dotenv";
import { app } from "./app.js";
import connectdb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
