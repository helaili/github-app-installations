const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");


try {
  console.log(`Retrieving installations for app ${core.getInput('app-id')}`)
  
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: core.getInput('app-id'),
      privateKey: core.getInput('private-key'),
    },
  })

  appOctokit.rest.apps.listInstallations().then(res => {
    core.setOutput("installations", time);
  }).catch(err => {
    core.setFailed(err.message);
  }
  
} catch (error) {
  core.setFailed(error.message);
}