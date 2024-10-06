const https = require('https');

exports.handler = async (event, context) => {
  const path = event.path.slice(1); // 移除开头的斜杠
  
  // 如果路径为空,返回假网页
  if (!path) {
    return {
      statusCode: 200,
      body: '<html><body><h1>江南皮革厂倒闭了！！！</h1></body></html>',
      headers: { 'Content-Type': 'text/html' }
    };
  }

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
        body: "Error: Unable to fetch content"
      });
    });
  });
};