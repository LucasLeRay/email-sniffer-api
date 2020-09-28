import fetch from 'node-fetch'
import emailsFromPage from './emailsFromPage'
import linksFromPage from './linksFromPage'

export default async (url, maxDepth) => {
  let emails = []
  const browsedUrls = []

  async function browsePage(link, depth = 1) {
    if (depth < maxDepth) {
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

  await browsePage(url)
  return emails
}
