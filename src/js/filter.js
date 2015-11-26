function filter (condition, i) {
  if (condition) {
    document.querySelector(`[data-index="${i}"]`).classList.remove('is-hidden')
  } else {
    document.querySelector(`[data-index="${i}"]`).classList.add('is-hidden')
  }
}

export default filter
