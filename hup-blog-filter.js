chrome.storage.sync.get(['users'], function (result) {
  console.log(result)
  if (result.users instanceof Array) {
    Array
      .from(document.querySelectorAll('article .username, article span[property="schema:name"]'))
      .filter(user => result.users.includes(user.textContent))
      .forEach(user => user.closest('.views-row').style.display = 'none')
  }
})