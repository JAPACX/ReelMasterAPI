import { GithubRepositoryInterface } from "../domain/interfaces/repository";
import { GithubRepositoryEntity } from "../domain/entities/repository";
export class GithubUseCase {
  constructor(private githubRepository: GithubRepositoryInterface) {}

  static create(githubRepository: GithubRepositoryInterface): GithubUseCase {
    return new GithubUseCase(githubRepository);
  }

  async getRepositories(
    username: string,
    page?: number,
    per_page?: number,
    mostPopularFirst?: boolean
  ): Promise<GithubRepositoryEntity[] | Error> {
    if (!username || username === "") {
      return new Error("Username is required");
    }

    if (per_page && per_page < 1) {
      return new Error("Per page must be greater than 0");
    }

    if (per_page && per_page > 100) {
      return new Error("Per page must be less than 100");
    }

    return this.githubRepository.getRepositories(
      username,
      page,
      per_page,
      mostPopularFirst
    );
  }
}
