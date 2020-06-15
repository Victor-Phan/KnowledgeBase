const toggle_replies = (e) => {
  let replyBox;

  if (e.classList.contains("search-results--item-replies-count")) {
    replyBox = e.parentNode.nextElementSibling;
  } else if (e.classList.contains("div-replyNum")) {
    replyBox = e.parentNode.parentNode.parentNode.nextElementSibling;
  }
  replyBox.style.display === "none"
    ? (replyBox.style.display = "block")
    : (replyBox.style.display = "none");
};