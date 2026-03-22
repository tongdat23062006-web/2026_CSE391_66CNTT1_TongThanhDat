document.querySelector('h1').textContent = "HELLO!";

let list = document.querySelector(".list");
list.innerHTML += "<li>New content</li>";

let list_item = document.createElement("li");
list_item.textContent = "NEW LIST ITEM";
list.appendChild(list_item);

let el = document.querySelector('.btn');
el.remove();