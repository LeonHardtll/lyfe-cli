const inquirer = require('inquirer')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const chalk = require('chalk')

const {
  getRepoList,
  getTagList,
} = require('./http')
const { loading } = require('./loading')

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async fetchRepo() {
    const repoList = await loading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    const repos = repoList.map(item => item.name);

    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    return repo;
  }

  async fetchTag(repo) {
    const tags = await loading(getTagList, 'waiting fetch tag', repo);
    if (!tags.length) return;
    
    const tagsList = tags.map(item => item.name);

    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project'
    })

    return tag
  }

  async download(repo, tag){
    const requestUrl = `lyfe-cli/${repo}${tag?'#'+tag:''}`;

    await loading(
      this.downloadGitRepo, // download fn
      'waiting download template', // tips
      requestUrl, // donwload url
      path.resolve(process.cwd(), this.targetDir) // download project to this path
    )
  }

  async create() {
    const repo = await this.fetchRepo()
    const tag = await this.fetchTag(repo)

    await this.download(repo, tag)

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator