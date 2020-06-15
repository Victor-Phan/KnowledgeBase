const hidePostCommentOnStart = () => {
  let list = document.getElementsByClassName("search-results--item-replies");
  Array.from(list).forEach((reply, index) => {
    reply.style.display = "none";
    //Returning false will ensure the page does not move
    return false;
  })
}
hidePostCommentOnStart();