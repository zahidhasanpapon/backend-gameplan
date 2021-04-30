import express from "express";
const router = express.Router();
import {
  getContacts,
  createContacts,
} from "../controllers/contactController.js";

router.route("/").get(getContacts).post(createContacts);

export default router;
