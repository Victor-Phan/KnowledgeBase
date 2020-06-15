var startIndex = 0;
var numPostPerPage = 5;
let list = document.getElementsByClassName("div--completePost-container");

const showHidePosts = (list, startIndex) => {
  Array.from(list).forEach((post, index) => {
    if (index >= startIndex && index < startIndex + numPostPerPage) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
    //Returning false will ensure the page does not move
    return false;
  })
}

const nextPostPage = () => {
  if (startIndex + numPostPerPage < list.length) {
    startIndex += numPostPerPage;
  }
  showHidePosts(list, startIndex);
}

const prevPostPage = () => {
  startIndex = (startIndex - numPostPerPage > 0) ? startIndex - numPostPerPage : 0;
  showHidePosts(list, startIndex);
}

showHidePosts(list, startIndex);