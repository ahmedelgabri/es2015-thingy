import data from './data.json' // In real life this data would come from an API
import render from './render'
import filter from './filter'
import formatDate from './helpers/formatDate'
import '../css/app.css'

document.addEventListener('DOMContentLoaded', () => {
  // Build HTML
  const frag = document.createDocumentFragment()
  const app = document.querySelector('#App')
  const appTitle = document.createElement('h1')
  appTitle.appendChild(document.createTextNode('Latest News'))

  const article = document.createElement('div')
  article.className = 'Article'

  const filters = document.createElement('div')
  filters.className = 'Filters'

  const search = document.createElement('input')
  search.className = 'Search FormField'
  search.setAttribute('type', 'text')
  search.setAttribute('placeholder', 'Search...')

  const dateFilter = document.createElement('select')
  dateFilter.className = 'DateFilter FormField'

  const newsList = document.createElement('ul')
  newsList.className = 'NewsList'

  render.list({
    data: data.results,
    container: dateFilter,
    template: function (data) {
      // Remove duplicate dates
      const deduped = [...new Set(data.map((item, i) => formatDate(item.publishedDate)))]
      return deduped.map((item, i) => `<option value="${item}">${item}</option>`)
    }
  })

  render.list({
    data: data.results,
    container: newsList,
    template: function (data) {
      return data.map((item, i) => `<li class="NewsList__item Link" data-index="${i}">${item.titleNoFormatting.trim()}</li>`)
    }
  })

  filters.appendChild(search)
  filters.appendChild(dateFilter)
  frag.appendChild(appTitle)
  frag.appendChild(filters)
  frag.appendChild(newsList)
  frag.appendChild(article)
  app.appendChild(frag)

  // Interactions
  document.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li' && e.target.classList.contains('NewsList__item')) {
      article.innerHTML = render.content(data.results[e.target.dataset.index])
    }
  })

  search.addEventListener('keyup', e => {
    const term = e.target.value.trim().toLowerCase()
    data.results.forEach((item, i) => filter(item.titleNoFormatting.toLowerCase().indexOf(term) > -1 || item.content.toLowerCase().indexOf(term) > -1, i))
  })

  dateFilter.addEventListener('change', (e) => {
    const term = e.target.value
    data.results.forEach((item, i) => filter(formatDate(item.publishedDate) === term, i))
  })
})
