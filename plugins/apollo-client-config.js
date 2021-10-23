import { InMemoryCache } from 'apollo-cache-inmemory'
export default function (context) {
  let config = {}
  if (process.client) {
    config = {
      httpPrefix: process.env.mantleClientSecure ? 'https' : 'http',
      wsPrefix: process.env.mantleClientSecure ? 'wss' : 'ws',
      hostname: process.env.mantleClientHost || window.location.hostname,
      port: process.env.mantleClientPort || window.location.port,
      url: process.env.mantleClientUrl || '/',
    }
  } else {
    config = {
      httpPrefix: process.env.mantleServerSecure ? 'https' : 'http',
      wsPrefix: process.env.mantleServerSecure ? 'wss' : 'ws',
      hostname: process.env.mantleServerHost || 'localhost',
      port: process.env.mantleServerPort || 4000,
      url: process.env.mantleServerUrl || '/',
    }
  }
  const portString = config.port ? `:${config.port}` : ``
  return {
    httpEndpoint: `${config.httpPrefix}://${config.hostname}${portString}${config.url}`,
    wsEndpoint: `${config.wsPrefix}://${config.hostname}${portString}${config.url}`,
    cache: new InMemoryCache({}),
  }
}
