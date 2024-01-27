import { VideoManagementUseCases } from "../../../application/useCases";
import { Request, Handler } from "express";

export interface VideoManagementRequest extends Request {
  useCases: VideoManagementUseCases;
}

export const getListVideos: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;
  try {
    res.send(await useCases.getListVideos());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getUserVideos: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;
  const { userId } = req.params;

  try {
    res.send(await useCases.getUserVideos(userId));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const loginUser: Handler = async (req: VideoManagementRequest, res) => {
  const useCases = req.useCases;

  const { username, password } = req.body;

  try {
    await useCases.loginUser(username, password);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const registerUser: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;

  const { name, last_name, username, password, email } = req.body;
  try {
    const result = await useCases.registerUser(
      name,
      last_name,
      username,
      password,
      email
    );
    if (result instanceof Error) {
      res.status(500).send({ error: result.message });
    } else {
      res.send({ success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteUserVideos: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;

  const { userId, videoId } = req.params;
  try {
    const success = await useCases.deleteVideo(userId, videoId);
    res.send({ success });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const addCommentToVideo: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;

  const { content } = req.body;
  const { videoId, userId } = req.params;
  try {
    const success = await useCases.addCommentToVideo(userId, videoId, content);
    res.send({ success });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const likeOrUnlikeVideo: Handler = async (
  req: VideoManagementRequest,
  res
) => {
  const useCases = req.useCases;

  const { videoId, userId } = req.params;
  try {
    const success = await useCases.likeOrUnlikeVideo(userId, videoId);
    res.send({ success });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
