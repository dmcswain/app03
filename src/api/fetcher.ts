async function fetcher(url: RequestInfo | URL, options?: RequestInit) {
   return fetch(url, {
      headers: {
         'Content-Type': 'application/json',
      },
      ...options,
   }).then(res => {
      if (res.headers.get('content-type') !== 'application/json') {
         throw new Error('Unexpected content-type');
      }

      return res.json();
   });
}

export default fetcher;
