const cardsList = document.querySelector('.content__wrapper')

async function getProducts() {
    const response = await fetch('https://докторслухов.рф/api/product/?cityId=1')
    const productsCards = (await response.json()).results
    productsCards.forEach(product => {
        let title = product.name
        let price = normalPrice(product.price) + ' ₽'
        let stock = 'none'
        let img = product.image
        let id = product.id
        if (!product.in_stock)
        {
            stock = null
        }
        cardsList.insertAdjacentHTML(
            'afterbegin',
            generateProduct(title, stock, price, img, id)
        )
        let newProduct = cardsList.querySelector('.card')
        productButton(newProduct.querySelector(".card__button"))
    })
}



const generateProduct = (title, in_stock, price, img, id) => {
    return `
        <article class="card" data-id="${id}">
            <div class="card__img">
                <img src="${img}" alt="${title}">
            </div>
            <h2 class="card__title">${title}</h2>
            <span class="card__availability ${in_stock}">Нет в наличии</span>
            <div class="card__price">
                <span class="card__price-new">${price}</span>
                <span class="card__price-old none"></span>
            </div>
            <button class="card__button button">Купить</button>
        </article>
    `;
}

getProducts()