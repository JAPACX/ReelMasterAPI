import { GithubRepositoryInterface } from "../../domain/interfaces/repository";
import { GithubRepositoryEntity } from "../../domain/entities/repository";
import axios from "axios";

export class DataSourceRepository implements GithubRepositoryInterface {
  async getRepositories(
    username: string,
    page?: number,
    per_page?: number,
    mostPopularFirst?: boolean
  ): Promise<GithubRepositoryEntity[] | Error> {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}${
          mostPopularFirst ? "&sort=stargazers" : ""
        }`
      );

      const repositories = response.data;

      return repositories;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      throw new Error("Failed to fetch repositories");
    }
  }
}
