import { Video } from "../entities/entities";

export interface VideoManagementInterface {
  getListVideos(): Promise<Video[] | Error>;

  getUserVideos(userId: string): Promise<Video[] | Error>;

  registerUser(
    name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
  ): Promise<boolean | Error>;

  loginUser(username: string, password: string): Promise<boolean | Error>;

  uploadVideo(
    userId: string,
    title: string,
    description: string,
    credits: string,
    isPublic: boolean,
    videoFile: File
  ): Promise<Video[] | Error>;

  addCommentToVideo(
    userId: string,
    videoId: string,
    content: string
  ): Promise<boolean | Error>;

  likeOrUnlikeVideo(userId: string, videoId: string): Promise<boolean | Error>;

  deleteUser(userId: string): Promise<boolean | Error>;

  deleteVideo(userId: string, videoId: string): Promise<boolean | Error>;

  deleteComment(userId: string, commentId: string): Promise<boolean | Error>;
}
