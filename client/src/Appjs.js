const sidebar = document.getElementsByClassName(".sidebar");
const mainContent = document.getElementsByClassName(".main-content");
//const triggerButton = document.getElementsByClassName(".myButton");

document.addEventListener("click", (event) => {
  event.preventDefault();

  sidebar.classList.toggle("sidebar_small");
  mainContent.classList.toggle("main-content_large");
});
