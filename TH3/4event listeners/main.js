let btn = document.querySelector('.btn');
btn.addEventListener('click', function() {
    alert('Button clicked!')
});
btn.addEventListener('mouseenter', function() {
    btn.classList.toggle('btn_event');
});

let title = document.querySelector('h1');
title.addEventListener('mouseenter', function(){
    title.style = 'cursor: pointer';
});
title.addEventListener('click', function(){
    title.textContent = 'Goodbye!';
});