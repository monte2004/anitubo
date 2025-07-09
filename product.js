document.querySelectorAll('.nav-arrows').forEach(arrows => {
    const prev = arrows.querySelector('.prev');
    const next = arrows.querySelector('.next');
    const productList = arrows.closest('.products-header').nextElementSibling;
    
    prev.addEventListener('click', () => {
        productList.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    next.addEventListener('click', () => {
        productList.scrollBy({ left: 300, behavior: 'smooth' });
    });
});