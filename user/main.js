//searchBar
document.addEventListener('keyup',e =>{
    if (e.target.matches('#searchBar')) {
        document.querySelectorAll('.cartProduc').forEach(sought=>{
            sought.textContent.toLowerCase().includes(e.target.value)
            ?sought.classList.remove('filtre')
            :sought.classList.add('filtre');
        })
    }
})


// Funciones para almacenar y traer los datos que se almacenan
function saveLocalStorage(key, value_to_save) {
    localStorage.setItem(key, JSON.stringify(value_to_save))
}
function getLocalStorage(key) {
    const dates = JSON.parse(localStorage.getItem(key))
    return dates
}
let products = getLocalStorage('products') || [];

// Variables que traemos de nuestro html
const purchaseInfo = document.getElementById('purchaseInfo');
const purchaseContainer = document.getElementById('purchaseContainer');
const purchaseProducts = document.getElementById('purchaseProducts');
const titleCar = document.getElementById('titleCart')
const container = document.getElementById('container');
const cart = document.getElementById('cart');
const number = document.getElementById("number");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const close = document.getElementById('close')

// Variables que vamos a usar en nuestoro proyecto
let list = []
let totalValue = 0

// Scroll de nuestra pagina
window.addEventListener("scroll", function () {
    if (container.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})


window.addEventListener('load', () => {
    viewProducts();
    purchaseContainer.classList.add("none")
})

function viewProducts() {
    container.innerHTML = ""
    for (let i = 0; i < products.length; i++) {
        if (products[i].existence > 0) {
            container.innerHTML += `<div class="cartProduc" ><img src="${products[i].urlImage}"><div class="information"><p class="name">${products[i].name}</p><p class="price">$${products[i].value}</p><p class="category">${products[i].category}</p><button onclick=buy(${i})>buy</button></div></div>`
        }
        else {
            container.innerHTML += `<div class="cartProduc" ><img src="${products[i].urlImage}"><div class="information"><p class="name">${products[i].name}</p><p class="price">$${products[i].value}</p><p class="category">${products[i].category}</p><p class="soldOut">Sold Out</p></div></div>`
        }
    }
}

function buy(indice) {
    list.push({ name: products[indice].name, price: products[indice].value })

    let van = true
    let i = 0
    while (van == true) {
        if (products[i].name == products[indice].name) {
            products[i].existence -= 1
            if (products[i].existence == 0) {
                viewProducts()
            }
            van = false
        }
        saveLocalStorage("products", products)
        i += 1
    }
    number.innerHTML = list.length
    number.classList.add("designNumber")
    return list
}

cart.addEventListener("click", function(){
    body.style.overflow = "hidden"
    purchaseContainer.classList.remove('none')
    titleCar.style.visibility='visible'
    purchaseContainer.classList.add('purchaseContainer')
    purchaseInfo.classList.add('purchaseInfo')
    showElemtersList()
})

function showElemtersList() {
    purchaseProducts.innerHTML = ""
    totalValue = 0
    for (let i = 0; i < list.length; i++){
        purchaseProducts.innerHTML += `<div><div class="img"><button onclick=eliminate(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${list[i].name}</p></div><p> $${list[i].price}</p></div>`
        totalValue += parseInt(list[i].price)
    }
    total.innerHTML = `<p>value Total</p> <p><span>$${totalValue}</span></p>`
}

function eliminate(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (products[i].name == list[indice].name) {
            products[i].existence += 1
            list.splice(indice, 1)
            van = false
        }
        i += 1
    }
    saveLocalStorage("products", products)

    number.innerHTML = list.length
    if (list.length == 0){
        number.classList.remove("diseñoNumero")
    }
    viewProducts()
    showElemtersList()
}

close.addEventListener("click", function(){
    body.style.overflow = "auto"
    purchaseContainer.classList.add('none')
    titleCar.style.visibility='hidden'
    purchaseContainer.classList.remove('purchaseContainer')
    purchaseInfo.classList.remove('purchaseInfo')
})