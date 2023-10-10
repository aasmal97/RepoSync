# Repo Sync
## Description
This Github Action allows a repo to push/merge changes to a another branch in a remote or same repository

## How this action works
1. The action first parses the provided targeted github url for the remote repository, and adds in the personal access token to the repo url.
2. Then it removes all local files. This prevents any collisions that may arise from have two seperate repos in the same directory
3. After, it adds the source and target repos as their own remote nodes, clones the target repo, and performs a git merge, merging the target branch with the source branch
4. We restore the local files removed, by pulling from the branch that triggered the workflow
## How to Use:
Below is an example of the minimum appropriate configuration 
```
name: Repo Sync
uses: aasmal97/repo-sync@1.0.0
with: 
  TARGET_REPO_URL: 'https://github.com/aasmal97/repo-sync.git'
  TARGET_REPO_BRANCH: 'main'
  TARGET_REPO_GITHUB_ACCESS_TOKEN: '${{ secrets.GITHUB_ACCESS_TOKEN }}
  BOT_NAME: 'Testing bot'
  BOT_EMAIL: 'testing@gmail.com'
```
Note: This action can only be used on a repo that has been ***initalized***, and has at least ***ONE*** branch configured!
## Inputs
- `TARGET_REPO_URL`: Github Url of target repository. Must be in the form of `https://github.com/owner/repoName.git`
- `TARGET_REPO_BRANCH`: Name of the branch in the target repository. ***(required)***
- `TARGET_REPO_GITHUB_ACCESS_TOKEN`: Personal Access Token that has permissions to push to target repository. To learn more on how to generate one, go [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) ***(required)***
- `BOT_NAME`: Name assigned to bot issuing the commit ***(required)***
- `BOT_EMAIL`: Email assigned to bot issuing the commit ***(required)***