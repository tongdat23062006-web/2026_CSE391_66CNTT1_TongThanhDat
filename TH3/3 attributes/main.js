let img = document.querySelector('img');
img.setAttribute('src', './static/img/broken_planet.webp');

let title = document.querySelector('h1');
title.textContent = 'Failed!'
title.style = 'color: red';

let list = document.querySelector('ul');
list.classList.add('list');
let first_item = document.querySelector('li');
first_item.classList.remove('item1');

title.classList.toggle('title');

console.log(title.classList.contains('title'));