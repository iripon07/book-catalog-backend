import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`);
    });
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(`Database connect to fail`, error);
  }
}

main();
