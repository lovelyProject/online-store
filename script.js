'use strict';

const cartIco = document.querySelector('.cart-ico');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('.cart-arrow')
const url = 'https://dh.cubicle.53xapps.com/products';
const productBox = document.querySelector('.product-box');
const shopContent = document.querySelector('.shop-content');
const filterShow = document.querySelector('.filter-arrow');
const filterBox = document.querySelector('.filters-box');
const filterClose = document.querySelector('.close-filter');
const filter = document.querySelector('.filter-button');
const cartItems = cart.querySelector('.cart-items');
const shopContentItems = shopContent.children;
const totalPrice = cart.querySelector('#total-cost');
const deleteItemSvg = '<svg  class="delete-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64"><defs><style>.cls-1{fill:#ff2400;}.cls-2{fill:#ba1d08;}</style></defs><title>Delete from cart</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M42.48,64h-29a6,6,0,0,1-6-5.5L4,16H52L48.46,58.5A6,6,0,0,1,42.48,64Z"/><path class="cls-2" d="M52,8H38V6a6,6,0,0,0-6-6H24a6,6,0,0,0-6,6V8H4a4,4,0,0,0-4,4v4H56V12A4,4,0,0,0,52,8ZM22,6a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2V8H22Z"/><path class="cls-2" d="M28,58a2,2,0,0,1-2-2V24a2,2,0,0,1,4,0V56A2,2,0,0,1,28,58Z"/><path class="cls-2" d="M38,58h-.13A2,2,0,0,1,36,55.88l2-32a2,2,0,1,1,4,.25l-2,32A2,2,0,0,1,38,58Z"/><path class="cls-2" d="M18,58a2,2,0,0,1-2-1.87l-2-32a2,2,0,0,1,4-.25l2,32A2,2,0,0,1,18.13,58Z"/></g></g></svg>';
const makeOrder = cart.querySelector('.make-order');


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
//Счетчик минуса для корзины
function makeMinusForCartCounter(){
    let number = this.nextElementSibling;
    let productBox = this.closest('.product-box');
    let price = productBox.querySelector('.price');
    const id = productBox.id;

    const nominalBlock = [...shopContentItems].find(elem => elem.id == id);
    const nominalPrice = nominalBlock.querySelector('.price');

           
        if(number.textContent > 1){
            number.textContent--;
            price.textContent -=  nominalPrice.textContent;
            totalPrice.textContent -= nominalPrice.textContent;
            
        }else{
            number.textContent = 1;
        }
}
//Счетчик плюса для корзины
function makePlusForCartCounter(){ 
    let productBox = this.closest('.product-box');
    let price = productBox.querySelector('.price'); 
    const id = productBox.id;

    const nominalBlock = [...shopContentItems].find(elem => elem.id == id);
    const nominalPrice = nominalBlock.querySelector('.price');
    
    this.previousElementSibling.textContent++;
    price.textContent = Number(price.textContent) + Number(nominalPrice.textContent);
    totalPrice.textContent = Number(totalPrice.textContent) + Number(nominalPrice.textContent);

    
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
    const cartItem = this.closest('.product-box').cloneNode(true);
    const cartBox = cart.querySelector('.cart-items');
    const price = cartItem.querySelector('.price');
    const totalCost = document.getElementById('total-cost');
    const counterNumber = cartItem.querySelector('.counter-number');

    counterNumber.previousElementSibling.addEventListener('click',makeMinusForCartCounter);
    counterNumber.nextElementSibling.addEventListener('click',makePlusForCartCounter);
    //Удаление кнопки добавить в корзину у клона
    cartItem.removeChild(cartItem.querySelector('button'));
    
    const btn = document.createElement('span');
    const priceblock = cartItem.querySelector('.price-block');
    
    btn.className = 'delete-btn';
    priceblock.innerHTML += deleteItemSvg;
    

    priceblock.querySelector('svg').addEventListener('click', deleteItemFromCart);
    
    cartItem.appendChild(btn);
    //Проверка есть ли предмет в корзине или нет
    findItemInCart(cartItems.children,totalCost,price,counterNumber,cartBox,cartItem);
    
}



//Удаление товара из корзины
function deleteItemFromCart(){
    const parent = this.closest('.product-box');
    const price = parent.querySelector('.price');
    
    totalPrice.textContent = Number(totalPrice.textContent) - Number(price.textContent);
    cartItems.removeChild(parent);
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
        newBox.title = newBox.title.replace('Смартфон', '');
        newBox.title = newBox.title.replace('Apple', '');
        //Копирование структуры карточки и ее генерация в контейнере
        copyBlock(newBox);

    }
}

function copyBlock(newBox){
    let box = productBox.cloneNode(true);
    box.price = newBox.price;

    box.querySelector('.product-img').style.background = `url(${newBox.photo.front}) center/contain no-repeat`;
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


//Делаем заказ и очищаем корзину
makeOrder.addEventListener('click',function(){
    if (cartItems.children.length > 0) {
        alert("We are making you order, thank you for choosing our store");
        
        [...cartItems.children].forEach(elem => cartItems.removeChild(elem));
       
        totalPrice.textContent = 0;
        localStorage.clear();
    } else{
        alert('Sorry, but you didn\'t take anything')
    }
    
})

function addToLocal(){
    let htmlItems = [cartItems.innerHTML];
    //Сохраняем код html элементов
    localStorage.setItem('items', htmlItems);
    // сохраняем общую цену
    localStorage.setItem('totalPrice', totalPrice.textContent)
}
//При закрытии страницы добавляем все предметы в локалку
window.addEventListener('unload', addToLocal);


//При загрузки страницы вытаскиваем все предметы из локалки
document.addEventListener('DOMContentLoaded', function(){
    
    if (localStorage.length > 0){
        cartItems.innerHTML = localStorage.getItem('items');
        totalPrice.textContent = localStorage.getItem('totalPrice');

        localStorage.clear();

        let deleteBtns = [...cartItems.querySelectorAll('svg')];
        let counters = [...cartItems.querySelectorAll('.counter-number')];
        //Навешиваем события на элементы в корзине
        counters.forEach(elem => elem.previousElementSibling.addEventListener('click',makeMinusForCartCounter));
        counters.forEach(elem => elem.nextElementSibling.addEventListener('click',makePlusForCartCounter));
        deleteBtns.forEach(elem => elem.addEventListener('click', deleteItemFromCart));       
    }
})