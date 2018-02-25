const path = require('path');
const media = require("./assets/imag/" + /^.*$/);

module.exports = {
    rootDir: path.join(process.cwd(), 'src'),
    collectCoverage: true,
    verbose: true
};