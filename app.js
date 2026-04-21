'use strict';

// Dependencies
const axios  = require('axios');
const OAuth  = require('oauth-1.0a');
const crypto = require('crypto');

module.exports = NetSuiteOAuth;

/**
 * Constructor
 *
 * @param {string} url
 * @param {string} method   HTTP verb (GET, POST, PUT, PATCH, DELETE)
 * @param {string} consumerKey
 * @param {string} consumerSecret
 * @param {string} tokenId
 * @param {string} tokenSecret
 * @param {string} account  NetSuite account ID (used as OAuth realm)
 * @constructor
 */
function NetSuiteOAuth(url, method, consumerKey, consumerSecret, tokenId, tokenSecret, account) {
    this.oauth = OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret
        },
        realm: account,
        signature_method: 'HMAC-SHA256',
        hash_function(base_string, key) {
            return crypto.createHmac('sha256', key).update(base_string).digest('base64');
        }
    });

    this.request_data = {
        url: url,
        method: method
    };

    this.token = {
        key: tokenId,
        secret: tokenSecret
    };

    this.headers = this.oauth.toHeader(this.oauth.authorize(this.request_data, this.token));
    this.headers['Content-Type'] = 'application/json';
}

NetSuiteOAuth.prototype.get = function () {
    return axios({
        url:     this.request_data.url,
        method:  this.request_data.method,
        headers: this.headers
    })
    .then(response => response.data)
    .catch(err => {
        const body = err.response ? err.response.data : err.message;
        console.log('Body data:', body);
        return Promise.reject(body || err);
    });
};

NetSuiteOAuth.prototype.post = function (data) {
    return axios({
        url:     this.request_data.url,
        method:  this.request_data.method,
        data:    data,
        headers: this.headers
    })
    .then(response => response.data)
    .catch(err => {
        const body = err.response ? err.response.data : err.message;
        console.log('Body data:', body);
        return Promise.reject(body || err);
    });
};

NetSuiteOAuth.prototype.put = function (data) {
    return axios({
        url:     this.request_data.url,
        method:  this.request_data.method,
        data:    data,
        headers: this.headers
    })
    .then(response => response.data)
    .catch(err => {
        const body = err.response ? err.response.data : err.message;
        console.log('Body data:', body);
        return Promise.reject(body || err);
    });
};
