export default function linksFromPage(bodyHTML, browsedUrls, url) {
  const linkObjects = $('a', bodyHTML)
  let links = []

  for (let i = 0; i < linkObjects.length; i++) {
    links.push(linkObjects[i].attribs.href)
  }
  links = links.filter(Boolean)
  links = links.map(link => (link[0] === '/' ? `${url}${link}` : link))
  links = links.filter(
    link => link.includes(url) && !browsedUrls.includes(link),
  )
  links = [...new Set(links)]
  return links
}
