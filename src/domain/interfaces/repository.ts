import { Video, User } from "../entities/repository";

export interface GithubRepositoryInterface {
  getRepositories(
    username: string,
    page?: number,
    per_page?: number,
    mostPopularFirst?: boolean
  ): Promise<Video[] | Error>;
}
