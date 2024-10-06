export default async (request, context) => {
  // 获取路径
  const url = new URL(request.url);
  const path = url.pathname.slice(1);  // 去掉 "/"

  // 如果路径为空（用户访问的是 a.com 或 a.com/）
  if (!path) {
    return new Response("江南皮革厂倒闭啦！！！", {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }

  // 构造完整的目标 URL
  const targetUrl = `https://${path}`;

  try {
    // Fetch 代理到目标地址
    const response = await fetch(targetUrl, { method: request.method, headers: request.headers });
    
    // 构建响应并返回
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};
