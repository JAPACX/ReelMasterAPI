// import { VideoManagementInterface } from "../../domain/interfaces/repository";
import { Video } from "../../domain/entities/video";
import { Sequelize, QueryTypes } from "sequelize";

export class DataSourceRepository {
  private pool: Sequelize;

  constructor(pool: Sequelize) {
    this.pool = pool;
  }

  async getPublicVideos(): Promise<Video[] | Error> {
    try {
      const result = await this.pool.query(
        "SELECT * FROM videos WHERE is_public = true",
        { type: QueryTypes.SELECT }
      );
      // eslint-disable-next-line no-console
      console.log(result);

      return new Error("Failed to fetch public videos");
    } catch (error) {
      throw new Error("Failed to fetch public videos");
    }
  }
}
