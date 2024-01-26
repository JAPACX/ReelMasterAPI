import { Router } from "express";
import { VideoManagementUseCases } from "../../../application/useCases";

export const router = Router();

router.get("/videos/:userId?", async (req, res) => {
  const useCases = req["useCases"] as VideoManagementUseCases;
  const { userId } = req.params;

  try {
    if (userId) {
      res.send(await useCases.getUserVideos(userId));
    } else {
      res.send(await useCases.getListVideos());
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const useCases = req["useCases"] as VideoManagementUseCases;
  try {
    const token = await useCases.loginUser(username, password);
    res.send({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/register", async (req, res) => {
  const { name, last_name, username, password, email } = req.body;
  const useCases = req["useCases"] as VideoManagementUseCases;
  try {
    const success = await useCases.registerUser(
      name,
      last_name,
      username,
      password,
      email
    );
    res.send({ success });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/videos/upload", async (_req, _res) => {
  // Implement video upload logic here
});

router.delete("/videos/:userId/:videoId", async (req, res) => {
  const { userId, videoId } = req.params;
  const useCases = req["useCases"] as VideoManagementUseCases;
  try {
    const success = await useCases.deleteVideo(userId, videoId);
    res.send({ success });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/videos/:userId/:videoId/comments", async (req, res) => {
  const { content } = req.body;
  const { videoId, userId } = req.params;
  const useCases = req["useCases"] as VideoManagementUseCases;
  try {
    const success = await useCases.addCommentToVideo(userId, videoId, content);
    res.send({ success });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/videos/:userId/:videoId/likes", async (req, res) => {
  const { videoId, userId } = req.params;
  const useCases = req["useCases"] as VideoManagementUseCases;
  try {
    const success = await useCases.likeOrUnlikeVideo(userId, videoId);
    res.send({ success });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  }
});
