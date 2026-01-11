import axios from "axios";

export async function GET() {
  const github_token = process.env.GITHUB_TOKEN;
  const response = await axios(
    "https://api.github.com/user/repos?visibility=public&sort=pushed",
    {
      headers: {
        Authorization: `Bearer ${github_token}`,
      },
    }
  );

  const filteredRepos = response.data.filter(
    (repo: { stargazers_count: number }) => repo.stargazers_count !== 0
  );

  return Response.json(filteredRepos);
}
