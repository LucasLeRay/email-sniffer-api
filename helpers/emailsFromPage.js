export default function emailsFromPage(bodyHTML, emails = []) {
  const regex = /[\w-]+(\.[\w-]+)*@[a-zA-Z-]+(\.[a-zA-Z-]+)*\.[a-z]{2,4}/g

  const result = [...new Set(bodyHTML.match(regex))]
  return result.filter((email) => !emails.includes(email))
}
