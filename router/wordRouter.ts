import { Router } from "express";
import {
  createUser,
  getAllUser,
  getOneUser,
  sendEmails,
} from "../controller/wordController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/send-emails/:userID").post(sendEmails);
router.route("/get-all").post(getAllUser);
router.route("/get-one").post(getOneUser);

export default router;
