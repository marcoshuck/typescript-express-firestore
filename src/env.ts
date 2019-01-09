import * as dotenv from "dotenv";

dotenv.config({
  path: "../",
});

const FIRESTORE_DB = process.env.FIRESTORE_DB;

export default FIRESTORE_DB;
