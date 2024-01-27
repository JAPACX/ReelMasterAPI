import { VideoManagementInterface } from "../domain/interfaces/repository";
import { Video } from "../domain/entities/entities";
import validator from "validator";

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
      throw new Error("User ID is required");
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
      throw new Error("All fields are required!");
    }

    if (
      name.length < 3 ||
      last_name.length < 3 ||
      username.length < 3 ||
      email.length < 3
    ) {
      throw new Error("All fields must have at least 3 characters");
    }

    if (password.length > 15) {
      throw new Error("Password cannot exceed 15 characters");
    }

    if (username.includes(" ")) {
      throw new Error("Username cannot contain spaces");
    }

    const passwordValidation = validator.isStrongPassword(password, {
      minLength: 5,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });

    if (!passwordValidation) {
      throw new Error(
        "Password must be 5 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one number"
      );
    }

    if (!validator.isAlphanumeric(username)) {
      throw new Error("Username must only contain letters and numbers");
    }

    if (!validator.isEmail(email) || email.length > 30) {
      throw new Error("Invalid email format or length exceeds 30 characters");
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

  async loginUser(username: string, password: string): Promise<string | Error> {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    if (username.length < 3 || password.length < 3) {
      throw new Error("All fields must have at least 3 characters");
    }

    if (username.includes(" ")) {
      throw new Error("Username cannot contain spaces");
    }

    const isValidUser = await this.videoRepository.loginUser(
      username,
      password
    );

    if (isValidUser) {
      return "token aca";
    } else {
      throw new Error("Invalid username or password");
    }
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
      throw new Error("Title and video file are required");
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
      throw new Error("Video ID and comment content are required");
    }

    if (content.length > 500) {
      throw new Error("Comment content is too long");
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
      throw new Error("Video ID is required");
    }

    await this.videoRepository.deleteVideo(userId, videoId);
    return true;
  }

  async deleteComment(
    userId: string,
    commentId: string
  ): Promise<boolean | Error> {
    if (!commentId) {
      throw new Error("Comment ID is required");
    }

    await this.videoRepository.deleteComment(userId, commentId);
    return true;
  }
}
