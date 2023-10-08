import * as core from "@actions/core";
import { context } from "@actions/github";
const parseRepoURL = (githubUrl: string) => {
  // Parse the URL
  const parsedUrl = new URL(githubUrl);
  // Extract owner/organization name and repo name
  const pathParts = parsedUrl.pathname.split("/").filter((part) => part !== "");
  if (pathParts.length === 2) {
    const [ownerName, repoName] = pathParts;
    return {
      owner: ownerName,
      name: repoName,
      path: `${ownerName}/${repoName}`,
    };
  } else {
    core.setFailed("Invalid GitHub URL");
    return null;
  }
};
export const main = async () => {
  const targetRepoURL = core.getInput("TARGET_REPO_URL");
  const commitMsg = context.payload.head_commit.message;
  core.exportVariable("COMMIT_MESSAGE", commitMsg);
  const repoURLData = parseRepoURL(targetRepoURL);
  if(!repoURLData) return
  const dataEntries = Object.entries(repoURLData);
  dataEntries.forEach(([key, value]) => {
    core.exportVariable(`TARGET_REPO_${key.toUpperCase()}`, value);
  });
};
main();
