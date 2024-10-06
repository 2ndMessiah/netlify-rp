export default async (request, context) => {
  // 获取路径
  const url = new URL(request.url);
  const path = url.pathname.slice(1);  // 去掉 "/"

  // 如果路径为空（用户访问的是 a.com 或 a.com/）
  if (!path) {
    return new Response("Mem: 291612K used, 199888K free, 26284K shrd, 5220K buff, 57220K cached", {
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
    return new Response(`Mem: 291612K used, 199888K free, 26284K shrd, 5220K buff, 57220K cached`, { status: 200 });
  }
};
