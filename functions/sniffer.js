import fetch from 'node-fetch'

import emailsFromPage from '../helpers/emailsFromPage'
import linksFromPage from '../helpers/linksFromPage'
import { failure, success } from '../helpers/response'

const { MAX_DEPTH } = process.env

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  const { url } = event.pathParameters
  let emails = []
  const browsedUrls = []

  async function browsePage(link, depth = 1) {
    if (depth < MAX_DEPTH) {
      try {
        browsedUrls.push(link.replace('/', ''))

        const res = await fetch(link)
        const bodyHTML = await res.text()

        emails = emails.concat(emailsFromPage(bodyHTML, emails))
        const links = linksFromPage(bodyHTML, url, browsedUrls)

        await Promise.all(links.map((l) => browsePage(l, depth + 1)))
      } catch (err) {
        console.log('Cannot scrap page:', link)
      }
    }
  }

  try {
    await browsePage(url)
  } catch (err) {
    return failure({ message: err.message })
  }

  return success(emails)
}
