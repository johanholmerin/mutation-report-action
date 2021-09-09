const https = require('https');

function request(url, { body, ...options }) {
  return new Promise((resolve, reject) => {
    const request = https
      .request(url, options, response => {
        let data = '';
        response.on('data', chunk => {
          data += chunk;
        });
        response.on('end', () => {
          if (response.statusCode >= 400) {
            const error = new Error(
              `Received status code ${response.statusCode}`,
            );
            error.data = data;
            error.response = response;
            reject(error);
          } else {
            try {
              resolve({ response, data: JSON.parse(data) });
            } catch (error) {
              reject(error);
            }
          }
        });
      })
      .on('error', reject);

    request.end(JSON.stringify(body));
  });
}

module.exports = request;
