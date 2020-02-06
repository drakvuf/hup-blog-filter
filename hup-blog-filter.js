chrome.storage.sync.get(['users'], function (result) {
  if (result.users instanceof Array) {
    Array
      .from(document.querySelectorAll('article .username, article span[property="schema:name"]'))
      .filter(user => result.users.includes(user.textContent))
      .forEach(user => {
        const parent = user.closest('.views-row')

        if (parent) {
          parent.style.display = 'none'
        }
      })
  }
})
