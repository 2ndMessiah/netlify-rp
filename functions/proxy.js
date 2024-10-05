const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const path = event.path.slice(1); // 移除开头的'/'
  
  if (!path.includes('.')) {
    return {
      statusCode: 400,
      body: 'Invalid URL'
    };
  }

  const url = `https://${path}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const body = await response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': contentType },
      body: body
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching the requested URL'
    };
  }
};
