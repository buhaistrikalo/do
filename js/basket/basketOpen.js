const basketButton = document.querySelector('.basket__icon')
const basketButtonClose = document.querySelector('.basket-content__header-cancle')
const basketPanel = document.querySelector('.basket-content')

basketButton.addEventListener('click', (event) => {
    event.stopPropagation();
    basketPanel.classList.toggle('basket-content-active')
})

//Click outside basket
window.addEventListener('click', () => {
    if (basketPanel.classList.contains('basket-content-active'))
    {
        basketPanel.classList.toggle('basket-content-active')
    }
})
basketButtonClose.addEventListener('click', () => {
    if (basketPanel.classList.contains('basket-content-active'))
    {
        basketPanel.classList.toggle('basket-content-active')
    }
})

basketPanel.addEventListener('click', (event) => {
    event.stopPropagation();
})


