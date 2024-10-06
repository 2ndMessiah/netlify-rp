export default async (request, context) => {
    const url = new URL(request.url);
    const link = url.pathname.slice(1); // 移除开头的 '/'
    
    if (!link) {
      return new Response("Please provide a link", { status: 400 });
    }
  
    try {
      const response = await fetch(link);
      const headers = new Headers(response.headers);
      headers.set('Access-Control-Allow-Origin', '*');
  
      return new Response(response.body, {
        status: response.status,
        headers: headers,
      });
    } catch (error) {
      return new Response(`Error fetching ${link}: ${error.message}`, { status: 500 });
    }
  };
  
  