import { GithubRepositoryEntity } from "../entities/repository";

export interface GithubRepositoryInterface {
  getRepositories(
    username: string,
    page?: number,
    per_page?: number,
    mostPopularFirst?: boolean
  ): Promise<GithubRepositoryEntity[] | Error>;
}
