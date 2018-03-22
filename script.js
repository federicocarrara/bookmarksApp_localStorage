var bookmarksList = document.getElementById('bookmarksList');
var form = document.getElementById('form');
var bookmarkUrl = document.getElementById('bookmarkUrl');
var bookmarkName = document.getElementById('bookmarkName');
form.addEventListener('submit', saveBookmark);

function saveBookmark(e){
  var bookmark = {
    url: bookmarkUrl.value,
    name: bookmarkName.value
  }
  if (!bookmarkUrl.value || !bookmarkName.value) {
    alert('please insert url and name')
  } else {
    if (localStorage.getItem("bookmarks") === null){
      var bookmarks = [];
    } else {
      var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    e.preventDefault();
    bookmarkUrl.value = '';
    bookmarkName.value = '';
    fetchBookmarks();
  }
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  bookmarksList.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    bookmarksList.innerHTML += `<li class="list-group-item">
                                  <h4>${bookmarks[i].name}</h4>
                                  <button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button>
                                  <a href= "${bookmarks[i].url}" class="btn btn-outline-primary">View</a>
                                </li>`;
  }
}

function deleteBookmark(i){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  bookmarks.splice(i, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}
