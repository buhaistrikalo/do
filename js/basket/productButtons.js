const clearBasketButton = document.querySelector('.basket-content__header-clear')
clearBasketButton.addEventListener('click', (e) => {
    basketProductList.querySelectorAll('.basket-content__item').forEach(product => {
        product.remove()
        updateQuantity()
        updateFullPrice()
    })
})

const newPDButton = (product) => {
    let button = product.querySelector('.basket-product__price-delete')
    button.addEventListener('mouseover', () => {
        button.querySelector(".basket-product__price").classList.add('none')
        button.querySelector(".basket-product__delete").classList.remove('none')
    })
    button.addEventListener('mouseout', () => {
        button.querySelector(".basket-product__delete").classList.add('none')
        button.querySelector(".basket-product__price").classList.remove('none')
    })
}

const newArrowButton = (product) => {
    let buttonUp = product.querySelector('.basket-product__count-up')
    let buttonDown = product.querySelector('.basket-product__count-down')

    buttonUp.addEventListener('click', (e) => {
        changeQuantity(product, 1)
    });
    buttonDown.addEventListener('click', (e) => {
        changeQuantity(product, -1)
    });
}

basketProductList.addEventListener('click', (e) => {
    if (e.target.classList.contains('basket-product__delete'))
    {
        deleteProducts(e.target.closest('.basket-content__item'))
    }
})

const deleteProducts = (product) => {
    product.remove()
    updateQuantity()
    updateFullPrice()
}