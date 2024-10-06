const https = require('https');

exports.handler = async (event, context) => {
  const path = event.path.slice(1); // 移除开头的斜杠
  const url = `https://${path}`;

  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve({
          statusCode: 200,
          body: data,
          headers: {
            'Content-Type': resp.headers['content-type']
          }
        });
      });

    }).on("error", (err) => {
      reject({
        statusCode: 500,
        body: "Error: " + err.message
      });
    });
  });
};

