const ora = require('ora')

// 加载动画
async function loading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result; 
  } catch (error) {
    spinner.fail('Request failed, refetch ...')
  } 
}

module.exports = {
  loading
}