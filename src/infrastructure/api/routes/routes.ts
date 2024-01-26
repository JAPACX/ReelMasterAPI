import { Router } from "express";
import {
  getUserVideos,
  loginUser,
  registerUser,
  deleteUserVideos,
  addCommentToVideo,
  likeOrUnlikeVideo,
} from "../controllers/controllers";

export const router = Router();

router.get("/videos/:userId?", getUserVideos);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/videos/upload", async (_req, _res) => {
  // Implement video upload logic here
});
router.delete("/videos/:userId/:videoId", deleteUserVideos);

router.post("/videos/:userId/:videoId/comments", addCommentToVideo);

router.post("/videos/:userId/:videoId/likes", likeOrUnlikeVideo);
