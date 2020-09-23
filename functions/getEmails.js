const fetch = require('node-fetch')
const $ = require('cheerio')

const { MAX_DEPTH } = process.env

exports.handler = async function (event) {
  const { url } = event.queryStringParameters
  let emails = []
  let browsedUrls = []

  async function browsePage(link, depth = 1) {
    if (depth < MAX_DEPTH) {
      try {
        browsedUrls.push(link)

        const res = await fetch(link)
        const bodyHTML = await res.text()

        emails = emails.concat(emailsFromPage(bodyHTML, emails))
        let links = linksFromPage(bodyHTML, browsedUrls, url)

        await Promise.all(links.map(l => browsePage(l, depth + 1)))
      } catch (err) {
        console.log(err)
        console.log('Cannot scrap page:', link)
      }
    }
  }

  try {
    await browsePage(url)
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(emails),
  }
}
