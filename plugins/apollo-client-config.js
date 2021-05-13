import { InMemoryCache } from 'apollo-cache-inmemory'
export default function (context) {
  return {
    httpEndpoint: `https://${context.env.apiUrl}`,
    wsEndpoint: `wss://${context.env.apiUrl}`,
    cache: new InMemoryCache({}),
  }
}
