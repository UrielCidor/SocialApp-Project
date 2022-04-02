const axios = require('axios');

module.exports = class HttpInvoker {
    constructor(config) {
        this._config = config;
    }
}