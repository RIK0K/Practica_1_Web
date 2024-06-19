document.querySelectorAll('.load-more').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.dataset.type;
        const skip = document.querySelectorAll(`.${type}-product`).length;

        fetch(`/loadMore?type=${type}&skip=${skip}`)
            .then(response => response.json())
            .then(products => {
                // Aquí debes agregar los nuevos productos a la página.
                // Esto dependerá de cómo estés mostrando los productos actualmente.
                // Por ejemplo, si estás usando divs para cada producto, podrías hacer algo como esto:
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add(`${type}-product`);
                    productDiv.innerHTML = `
                        <a href="post/${product.id},${type}">
                            <img class="product-photo" src="${product.img}">
                        </a>
                    `;
                    document.querySelector(`.${type}-organizacion`).appendChild(productDiv);
                });
            });
    });
});