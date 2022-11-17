'use strict';

const cartIco = document.querySelector('.cart-ico');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('.cart-arrow')
const url = 'https://dh.cubicle.53xapps.com/products';
const productBox = document.querySelector('.product-box');
const shopContent = document.querySelector('.shop-content');
const  filterShow = document.querySelector('.filter-arrow');
const filterBox = document.querySelector('.filters-box');
const filterClose = document.querySelector('.close-filter');
const filter = document.querySelector('.filter-button');
const cartItems = cart.querySelector('.cart-items').children;

//Минус у счетчика в карточке на странице
function makeMinusCounter(){
    let number = this.nextElementSibling;
    let productBox = this.closest('.product-box');
    let price = productBox.querySelector('.price');
           
        if(number.textContent > 1){
            number.textContent--;
        
            
        }else{
            number.textContent = 1;
        }

}
//Плюс у счетчика в карточке на странице
function makePlusCounter(){ 
    let productBox = this.closest('.product-box');
    let price = productBox.querySelector('.price');
    
    this.previousElementSibling.textContent++;
    
}

//Поиск элемента в корзине при добавлении в корзину

//добавить товар в корзину
function addToCart(){
    let cartItem = this.closest('.product-box').cloneNode(true);
    let cartBox = cart.querySelector('.cart-items');
    let price = cartItem.querySelector('.price');
    let totalCost = document.getElementById('total-cost');
    let counterNumber = cartItem.querySelector('.counter-number');
    counterNumber.previousElementSibling.addEventListener('click',makeMinusCounter);
    counterNumber.nextElementSibling.addEventListener('click',makePlusCounter);
    //Удаление кнопки добавить в корзину у клона
    cartItem.removeChild(cartItem.querySelector('button'));
    //Проверка есть ли предмет в корзине или нет
    findItemInCart(cartItems,totalCost,price,counterNumber,cartBox,cartItem);
    
}

function findItemInCart(arr,totalCost,price,counterNumber,cartBox,cartItem){
    let itemsArr = [...arr];
    let good = itemsArr.find(elem=> elem.id == cartItem.id);

    if (good){
        totalCost.textContent = Number(totalCost.textContent) + Number(price.textContent) * counterNumber.textContent;
        good.querySelector('.counter-number').textContent = Number(good.querySelector('.counter-number').textContent) + Number(counterNumber.textContent);
        good.querySelector('.price').textContent = Number(good.querySelector('.price').textContent) + Number(price.textContent) * counterNumber.textContent;
    }else{
        totalCost.textContent = (totalCost.textContent == '0')? price.textContent * counterNumber.textContent : +totalCost.textContent + +price.textContent * counterNumber.textContent;
        price.textContent = Number(price.textContent) * counterNumber.textContent;
        cartBox.appendChild(cartItem);
    }
}
//Открытие корзины при клике
cartIco.addEventListener('click',()=>{
    cart.classList.toggle('cart-ico_active');
})
//Закрытие корзины при клике
closeCart.addEventListener('click',()=>{
    cart.classList.remove('cart-ico_active');
})

class Product{
    constructor(id,category,title,description,photo,price,brandId){
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.photo = photo;
        this.price = price;
        this.brandId = brandId;
    }
}
//Получение данных и рендер карточек
async function getData(link){
    const data = await fetch(link);
    const result = await data.json();
    
    renderProducts(result);
}

getData(url); //Загружаем карточки с товарами 

//рендер карточек
const renderProducts = function(list){
    for (let i = 20; i < list.length; i++){
       let  {id,category_id:categoryId,title,description,photo,price,brand_id:brandId} = list[i];

        const newBox = new Product(id,categoryId,title,description,photo,price,brandId);
        
        let box = productBox.cloneNode(true);
        box.price = newBox.price;

        box.querySelector('.product-img').src = newBox.photo.front;
        box.querySelector('.product-title').textContent = newBox.title ;
        box.querySelector('.price').textContent = newBox.price;

        box.querySelector('.counter_minus').addEventListener('click',makeMinusCounter);
        box.querySelector('.counter_plus').addEventListener('click',makePlusCounter);
        box.querySelector('.add-to-cart').addEventListener('click',addToCart);

        box.id = newBox.id;
        box.dataset.category = newBox.category;
        box.dataset.brandId = newBox.brandId;
        shopContent.appendChild(box);
    }
}

//Открытие фильтров
filterShow.addEventListener('click',()=>{
    filterBox.classList.add('filters-box_active');
})
//Закрытие фильтров
filterClose.addEventListener('click',()=>{
    filterBox.classList.remove('filters-box_active');
})

//функционал фильтров
filter.addEventListener('click', function(){
   let inputs = filterBox.querySelectorAll('input');
   let inputsArray = [...inputs];
   let checkedInputs = inputsArray.filter(input => input.checked);

   hideElements(shopContent.children);

   for (let elem of shopContent.children){
    for (let input of checkedInputs){
       if (elem.dataset.brandId == input.dataset.category) {

        elem.classList.remove('hide');
       }
    }
   }


})
//Спрятать элементы
function hideElements(arr){
    let list = [...arr]

    list.forEach(element => {
        element.classList.add('hide');
    });
}

