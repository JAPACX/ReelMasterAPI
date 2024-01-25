import { GithubUseCase } from "../../application/useCases";

export const resolvers = {
  Query: {
    GetRepositories: async (
      _: any,
      args: {
        username: string;
        page?: number;
        per_page?: number;
        mostPopularFirst?: boolean;
      },
      { useCases }: { useCases: GithubUseCase }
    ) => {
      try {
        const { username, page, per_page, mostPopularFirst } = args;
        const result = await useCases.getRepositories(
          username,
          page,
          per_page,
          mostPopularFirst
        );

        return result;
      } catch (error) {
        console.error("Error fetching repositories:", error);
        throw new Error("Failed to fetch repositories");
      }
    },
  },
};
