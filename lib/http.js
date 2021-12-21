const axios = require('axios');

axios.interceptors.response.use(res => {
  return res.data;
})

/**
 * get all repos
 * @returns Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/orgs/lyfe-cli/repos')
}

/**
 * get repos tags
 * @param {string} repo repos
 * @returns Promise
 */
 async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/lyfe-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList,
}