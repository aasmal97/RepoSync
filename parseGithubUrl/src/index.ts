import * as core from "@actions/core";
const parseRepoURL = (githubUrl: string, accessToken: string) => {
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
      url: `https://${accessToken}@github.com/${ownerName}/${repoName}.git`,
    };
  } else {
    core.setFailed("Invalid GitHub URL");
    return null;
  }
};
export const main = async () => {
  const targetRepoURL = core.getInput("TARGET_REPO_URL");
  const accessToken = core.getInput("TARGET_REPO_GITHUB_ACCESS_TOKEN");
  const repoURLData = parseRepoURL(targetRepoURL, accessToken);
  if(!repoURLData) return
  const dataEntries = Object.entries(repoURLData);
  dataEntries.forEach(([key, value]) => {
    core.exportVariable(`TARGET_REPO_${key.toUpperCase()}`, value);
  });
};
main();
