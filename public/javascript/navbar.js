const activeclass =
  "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
const inactiveclass =
  "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

const currentUrl = window.location.pathname;

let atags = document.querySelectorAll("#navbar-user a");
atags = Object.values(atags);

console.log(currentUrl);

atags.forEach((atag) => {
  atag.className = inactiveclass;
  if (atag.pathname == currentUrl) {
    atag.className = activeclass;
  }
});
