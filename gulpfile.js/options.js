var minimist = require('minimist');
var evnOptions = {
  string: 'env',
  default: { env: "develop" }
}
var options = minimist(process.argv.slice(2), evnOptions)
console.log(options);
exports.options = options;