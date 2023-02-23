let formu= []
let submitbutton= document.getElementById("submitInput");
let todook=1;

submitbutton.onclick = () => {

formu.unshift({nombre: document.getElementById("nombreInput").value, apellido: document.getElementById("apellidoInput").value, mail: document.getElementById("mailInput").value});

    if(formu[0].nombre=="" || formu[0].apellido=="" || formu[0].mail==""){
        alert("No puede dejar casillas en blanco");
        todook=0;
    }

    if(formu[0].mail.search("@hotmail")==-1 && formu[0].mail.search("@gmail")==-1 && form[0].mail.search("@yahoo")==-1 && form[0].mail.search("@live")==-1){
        alert("El email ingresado es inválido");
        todook=0;
    }else if(todook=1){
        alert("Registro exitoso!");
    }
    
}
/*
let objUsuario = {
    nombre : 'Magali',
    apellido : 'Lopez Barrios',
    mail : 'maguilopezbarrios@hotmail.com' ,
}

localStorage.setItem ('usuario', JSON.stringify (objUsuario));
console.log (localStorage.getItem ('usuario'));*/

//enviar datos de registro
const $form = document.querySelector('#form')
const $buttonMailto = document.querySelector('#truco')

$form.addEventListener('submit', handleSubmit)

function handleSubmit(event){
    event.preventDefault()
    const form = new FormData(this)
    fetch(this.action, {
        method: this.method,
        body: form,
        headers:{
            'Accept': 'application/json'
        }
    })
}


//CARRITO DE COMPRAS

//variables
let allContainerCart = document.querySelector('#products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
function clearHtml(){
    containerBuyCart.innerHTML = '';
}
