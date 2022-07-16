const core = require('@actions/core')
const github = require('@actions/github')
// const { Octokit } = require('@octokit/rest')
// const { createAppAuth } = require('@octokit/auth-app')


try {
  console.log(`Retrieving installations for app ${core.getInput('app-id')}`)

  const octokit = new github.GitHub({
    authStrategy: github.createAppAuth,
    auth: {
      appId: core.getInput('app-id'),
      privateKey: core.getInput('private-key'),
    },
  })

  octokit.rest.apps.listInstallations().then(res => {
    console.log(`Found installations : ${JSON.stringify(res.data.installations)}`)
    core.setOutput('installations', res.data.installations)
  }).catch(err => {
    core.setFailed(err.message);
  })
} catch (error) {
  core.setFailed(error.message);
}