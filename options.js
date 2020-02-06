const userForm = document.querySelector('.user-form')
const userInput = document.querySelector('.user-form input')
const userListElement = document.querySelector('.user-list')

function createDeleteButtonElement (parent) {
  const newButton = document.createElement('button')

  newButton.textContent = 'törlés'
  newButton.addEventListener('click', deleteUser)

  parent.appendChild(newButton)
}

function createListElement (user) {
  const newListItem = document.createElement('li')
  
  newListItem.textContent = user
  createDeleteButtonElement(newListItem)
  userListElement.appendChild(newListItem)
}

function listUsers () {
  chrome.storage.sync.get(['users'], function (result) {
    if (result.users instanceof Array && result.users.length > 0) {
      userListElement.innerHTML = ''
      result.users.forEach(createListElement)
    } else {
      userListElement.innerHTML = '<p>Jelenleg nincsenek tiltott felhasználók.</p>'
    }
  })
}

function saveUser (event) {
  event.preventDefault()

  const newUser = userInput.value

  chrome.storage.sync.get(['users'], function (result) {
    const oldUsers = result.users instanceof Array ? result.users : []

    chrome.storage.sync.set({
      users: [...oldUsers, newUser]
    }, function () {
      userInput.value = ''
      listUsers()
    })
  })
}

function deleteUser (event) {
  chrome.storage.sync.get(['users'], function (result) {
    if (result.users instanceof Array) {
      const userToDelete = event.target.closest('li').childNodes[0].nodeValue

      const filteredUsers = result.users.filter(user => user !== userToDelete)

      chrome.storage.sync.set({
        users: filteredUsers
      }, listUsers)
    }
  })
}

userForm.addEventListener('submit', saveUser)
document.addEventListener('DOMContentLoaded', listUsers)
