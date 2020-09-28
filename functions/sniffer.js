import { failure, success } from '../helpers/response'
import urlSniffer from '../helpers/urlSniffer'

const { MAX_DEPTH } = process.env

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const data = {}
  const { urls } = event.pathParameters

  try {
    await Promise.all(
      urls.map(async (url) => {
        data[url] = await urlSniffer(url, MAX_DEPTH)
      }),
    )
  } catch (err) {
    return failure({ message: err.message })
  }

  return success(data)
}
