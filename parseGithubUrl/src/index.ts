import * as core from "@actions/core";
const parseRepoURL = (githubUrl: string, accessToken?: string) => {
  // Parse the URL
  const removeExtension = githubUrl.replace(/\.git$/, "");
  const parsedUrl = new URL(removeExtension);
  // Extract owner/organization name and repo name
  const pathParts = parsedUrl.pathname.split("/").filter((part) => part !== "");
  if (pathParts.length === 2) {
    const [ownerName, repoName] = pathParts;
    return {
      owner: ownerName,
      name: repoName,
      path: `${ownerName}/${repoName}`,
      url: `https://${
        accessToken ? `${ownerName}:${accessToken}@` : ""
      }github.com/${ownerName}/${repoName}.git`,
    };
  } else {
    core.setFailed("Invalid GitHub URL");
    return null;
  }
};
export const main = async () => {
  const repoURL = core.getInput("REPO_URL");
  const accessToken = core.getInput("REPO_GITHUB_ACCESS_TOKEN");
  const prefix = core.getInput("PREFIX");
  const repoURLData = parseRepoURL(repoURL, accessToken);
  if (!repoURLData) return;
  const dataEntries = Object.entries(repoURLData);
  dataEntries.forEach(([key, value]) => {
    core.exportVariable(`${prefix}_${key.toUpperCase()}`, value);
  });
};
main();
