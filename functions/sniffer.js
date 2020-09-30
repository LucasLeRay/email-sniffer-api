import { failure, success } from '../helpers/response'
import urlSniffer from '../helpers/urlSniffer'

const { MAX_DEPTH } = process.env

const instance = Math.random().toString().slice(2)

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  console.time(`Sniffer: ${instance}`)
  const url = event.queryStringParameters && event.queryStringParameters.url

  if (!url) return failure({ message: 'No url provided.' })

  try {
    const data = await urlSniffer(url.split('/')[0], MAX_DEPTH)

    console.timeEnd(`Sniffer: ${instance}`)
    return success(data)
  } catch (err) {
    return failure({ message: err.message })
  }
}
