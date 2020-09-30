import $ from 'cheerio'
import getDomain from './getDomain'

export default function linksFromPage(bodyHTML, url, browsedUrls = []) {
  const linkObjects = $('a', bodyHTML)
  let links = []

  for (let i = 0; i < linkObjects.length; i += 1) {
    links.push(linkObjects[i].attribs.href)
  }
  links = links.filter(Boolean)
  links = links.map((link) => (link[0] === '/' ? `${url}${link}` : link))
  links = links.filter(
    (link) =>
      link.replace(/^https?:\/\//i, '').includes(getDomain(url)) &&
      !browsedUrls.includes(link.replace('/', '')),
  )
  links = [...new Set(links)]
  return links
}
