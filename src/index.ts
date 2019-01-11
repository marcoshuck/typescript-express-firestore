import * as functions from "firebase-functions";
import app from "./app";

export const api = functions.https.onRequest(app);
