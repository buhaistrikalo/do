const productsButton = document.querySelectorAll('.card__button')
const basketProductList = document.querySelector('.basket-content__list')
const basket = document.querySelector('.basket')
const basketQuantity = document.querySelector('.basket__quantity')
const basketCount = document.querySelector('.basket-content__footer-count')
const fullPrice = document.querySelector('.basket-content__footer-fullprice')

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// total cost
const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
}

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}


const updateFullPrice = () => {
    let totalCost = 0
    basketProductList.querySelectorAll('.basket-content__card').forEach(product => {
        totalCost += parseInt(
            priceWithoutSpaces(
                product.querySelector('.basket-product__price').textContent
            )
        )
    })

    fullPrice.textContent = `${normalPrice(totalCost)} ₽`
}

const updatePrice = (product) => {
    product.querySelector('.basket-product__price').textContent = `${normalPrice(product.dataset.price * quantityToIng(product))} ₽`
}

// Quantity
const updateQuantity = () => { // Пересчитать колво товаров (всех)
    let length = 0
    basketProductList.querySelectorAll('.basket-content__card').forEach(product => {
        length += quantityToIng(product)
    })

    basketQuantity.textContent = `${length}` // Иконка
    // Внутри корзины
    if (length > 0)
    {
        basketCount.textContent = `${length} товара`
    } else
    {
        basketCount.textContent = `Товаров  нет`
    }

};
const quantityToIng = (countSelector) => {
    return parseInt(countSelector.querySelector('.basket-product__count-now').textContent.slice(0, -3))
}
const changeQuantity = (product, number) => {
    let newCount = quantityToIng(product) + number
    if (newCount < 1)
    {
        deleteProducts(product.closest('.basket-content__item'))
    } else
    {
        product.querySelector('.basket-product__count-now').textContent = newCount + ' шт'
        updatePrice(product)
    }
    updateFullPrice();
    updateQuantity();
}

// Card in basket
const generateBasketProduct = (title, priceString, priceNumber, count, id) => {
    return `
        <li class="basket-content__item" >
            <article class="basket-content__card basket-product" data-id='${id}' data-price='${priceNumber}'>
                <div class="basket-product__info">
                    <h3 class="basket-product__title">${title}</h3>
                    <div class="flex-space">
                        <div class="basket-product__count">
                            <button class="basket-product__count-up">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.59 15.41L12 10.83L7.41 15.41L6 14L12 8L18 14L16.59 15.41Z"
                                        fill="black" />
                                </svg>
                            </button> 
                            <span class="basket-product__count-now">${count} шт</span>
                            <button class="basket-product__count-down">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
                                        fill="black" />
                                </svg>
                            </button>
                        </div>
                        <label for="" class="basket-product__price-delete">
                            <div class="basket-product__price">${priceString}</div>
                            <button class="basket-product__delete none">Удалить</button>
                        </label>
                    </div>
                </div>
            </article>
        </li >
    `;
}

const productButton = (el => {
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.card');
        let id = parent.dataset.id;
        let productFounded
        basketProductList.querySelectorAll('.basket-product').forEach(product => {
            if (id === product.dataset.id)
            {
                productFounded = product
            }
        });
        if (productFounded)
        {
            changeQuantity(productFounded, 1)
        }
        else
        {
            let title = parent.querySelector('.card__title').textContent; if (title.length > 55) title = title.substring(0, 55) + '...'
            let priceString = parent.querySelector('.card__price-new').textContent
            let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.card__price-new').textContent))

            basketProductList.insertAdjacentHTML(
                'afterbegin',
                generateBasketProduct(title, priceString, priceNumber, 1, id)
            )
            let newProduct = basketProductList.querySelector('.basket-content__card')
            newPDButton(newProduct)
            newArrowButton(newProduct)
        }

        updateQuantity()
        updateFullPrice()
    })
})

// render 
updateQuantity()
updateFullPrice()

