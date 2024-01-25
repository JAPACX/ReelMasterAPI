import { VideoManagementInterface } from "../../domain/interfaces/repository";
import { Video } from "../../domain/entities/video";
import { Sequelize, QueryTypes } from "sequelize";

export class DataSourceRepository implements VideoManagementInterface {
  private pool: Sequelize;

  constructor(pool: Sequelize) {
    this.pool = pool;
  }

  async getListVideos(): Promise<Video[] | Error> {
    try {
      const result = await this.pool.query(
        "SELECT * FROM videos WHERE is_public = true",
        { type: QueryTypes.SELECT }
      );

      return result as Video[];
    } catch (error) {
      throw new Error("Failed to fetch public videos");
    }
  }

  async getUserVideos(userId: string): Promise<Video[] | Error> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM videos WHERE user_id = '${userId}'`,
        { type: QueryTypes.SELECT }
      );
      return result as Video[];
    } catch (error) {
      throw new Error("Failed to fetch user videos");
    }
  }

  async registerUser(
    name: string,
    last_name: string,
    username: string,
    password: string,
    email: string
  ): Promise<boolean | Error> {
    try {
      await this.pool.query(
        `INSERT INTO users (name, last_name, username, password_hash, email)
       VALUES ('${name}', '${last_name}', '${username}', '${password}', '${email}');`,
        { type: QueryTypes.INSERT }
      );
      return true;
    } catch (error) {
      throw new Error("Failed to fetch public videos");
    }
  }
  // no va aqui
  async loginUser(username: string, password: string): Promise<string | Error> {
    try {
      // eslint-disable-next-line no-console
      console.log(username, password);

      const token = "dummy-token";
      return token;
    } catch (error) {
      throw new Error("Failed to login user");
    }
  }
  // no va aqui
  async uploadVideo(
    userId: string,
    title: string,
    description: string,
    credits: string,
    is_public: boolean,
    videoFile: File
  ): Promise<Video[] | Error> {
    try {
      const uploadedVideo: Video = {
        video_id: "dummy-id",
        title,
        description,
        credits,
        is_public,
        user_id: "dummy-user-id",
        comments: [],
        likes: [],
      };
      // eslint-disable-next-line no-console
      console.log(videoFile);

      return [uploadedVideo];
    } catch (error) {
      throw new Error("Failed to upload video");
    }
  }

  async addCommentToVideo(
    userId: string,
    videoId: string,
    content: string
  ): Promise<boolean | Error> {
    try {
      await this.pool.query(
        `INSERT INTO comments (user_id, content, video_id)
       VALUES ('${userId}', '${content}', '${videoId}');`,
        { type: QueryTypes.INSERT }
      );
      return true;
    } catch (error) {
      throw new Error("Failed to add comment");
    }
  }

  async likeOrUnlikeVideo(
    userId: string,
    videoId: string
  ): Promise<boolean | Error> {
    try {
      // eslint-disable-next-line no-console
      console.log(userId, videoId);

      return true;
    } catch (error) {
      throw new Error("Failed to like/unlike video");
    }
  }

  async deleteUser(userId: string): Promise<boolean | Error> {
    try {
      // eslint-disable-next-line no-console
      console.log(userId);
      return true;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }

  async deleteVideo(userId: string, videoId: string): Promise<boolean | Error> {
    try {
      // eslint-disable-next-line no-console
      console.log(userId, videoId);
      return true;
    } catch (error) {
      throw new Error("Failed to delete video");
    }
  }

  async deleteComment(
    userId: string,
    commentId: string
  ): Promise<boolean | Error> {
    try {
      // eslint-disable-next-line no-console
      console.log(userId, commentId);
      return true;
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}
