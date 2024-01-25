import { VideoManagementInterface } from "../domain/interfaces/repository";
import { Video } from "../domain/entities/video";

export class VideoManagementUseCases {
  constructor(private videoRepository: VideoManagementInterface) {}

  static create(
    videoRepository: VideoManagementInterface
  ): VideoManagementUseCases {
    return new VideoManagementUseCases(videoRepository);
  }

  async getListVideos(): Promise<Video[] | Error> {
    return this.videoRepository.getListVideos();
  }

  async getUserVideos(userId: string): Promise<Video[] | Error> {
    if (!userId) {
      return new Error("User ID is required");
    }

    return this.videoRepository.getUserVideos(userId);
  }

  async registerUser(
    name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
  ): Promise<boolean | Error> {
    if (!name || !last_name || !username || !password || !email) {
      return new Error("All fields are required");
    }

    await this.videoRepository.registerUser(
      name,
      last_name,
      username,
      password,
      email
    );
    return true;
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<boolean | Error> {
    if (!username || !password) {
      return new Error("Username and password are required");
    }

    await this.videoRepository.loginUser(username, password);
    return true;
  }

  async uploadVideo(
    userId: string,
    title: string,
    description: string,
    credits: string,
    isPublic: boolean,
    videoFile: File
  ): Promise<boolean | Error> {
    if (!title || !videoFile) {
      return new Error("Title and video file are required");
    }

    await this.videoRepository.uploadVideo(
      userId,
      title,
      description,
      credits,
      isPublic,
      videoFile
    );

    return true;
  }

  async addCommentToVideo(
    userId: string,
    videoId: string,
    content: string
  ): Promise<boolean | Error> {
    if (!videoId || !content) {
      return new Error("Video ID and comment content are required");
    }

    if (content.length > 500) {
      return new Error("Comment content is too long");
    }

    await this.videoRepository.addCommentToVideo(userId, videoId, content);
    return true;
  }

  async likeOrUnlikeVideo(
    userId: string,
    videoId: string
  ): Promise<boolean | Error> {
    if (!videoId) {
      return new Error("Video ID is required");
    }

    await this.videoRepository.likeOrUnlikeVideo(userId, videoId);
    return true;
  }

  async deleteUser(userId: string): Promise<boolean | Error> {
    if (!userId) {
      return new Error("User ID is required");
    }

    await this.videoRepository.deleteUser(userId);
    return true;
  }

  async deleteVideo(userId: string, videoId: string): Promise<boolean | Error> {
    if (!videoId) {
      return new Error("Video ID is required");
    }

    await this.videoRepository.deleteVideo(userId, videoId);
    return true;
  }

  async deleteComment(
    userId: string,
    commentId: string
  ): Promise<boolean | Error> {
    if (!commentId) {
      return new Error("Comment ID is required");
    }

    await this.videoRepository.deleteComment(userId, commentId);
    return true;
  }
}
