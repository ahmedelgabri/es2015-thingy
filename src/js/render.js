import formatDate from './helpers/formatDate'

function list ({ data, container, template }) {
  const items = template(data)
  container.innerHTML = items.join('')

  return container
}

function content (content) {
  const main = `<div class="Wrap">
    <h2 class="Article__title">${content.titleNoFormatting}</h2>
    <p><em>Published by ${content.publisher} on ${formatDate(content.publishedDate)}</em></p>
    <img class="Article__img" src="${content.image.url}">
    <p>${content.content}</p>
    <p><a href="${content.unescapedUrl}">Read more</a></p>
  </div>`

  const related = content.relatedStories ? `<h3>Related articles</h3>
    <ul class="RelatedList">
      ${content.relatedStories.map(r => `<li><a href="${r.unescapedUrl}">${r.titleNoFormatting}</a></li>`).join('')}
    </ul>` : ''

  return `${main}${related}`
}

export default {
  list,
  content
}
