import { Video } from "../entities/video";

export interface VideoManagementInterface {
  getPublicVideos(): Promise<Video[] | Error>;

  getUserVideos(userId: string): Promise<Video[] | Error>;

  registerUser(
    name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
  ): Promise<void | Error>;

  loginUser(username: string, password: string): Promise<string | Error>;

  uploadVideo(
    title: string,
    description: string,
    credits: string,
    isPublic: boolean,
    videoFile: File
  ): Promise<Video[] | Error>;

  addCommentToVideo(videoId: string, content: string): Promise<boolean | Error>;

  likeOrUnlikeVideo(videoId: string): Promise<boolean | Error>;

  deleteUser(userId: string): Promise<boolean | Error>;

  deleteVideo(videoId: string): Promise<boolean | Error>;

  deleteComment(commentId: string): Promise<boolean | Error>;
}
