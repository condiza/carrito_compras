function saveLocalStorage(key, value_to_save) {
    localStorage.setItem(key, JSON.stringify(value_to_save))
}
function getLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key))
    return data
}

let products = getLocalStorage('products') || [];
let message = document.getElementById('message')

//Añadir un producto
const addProduct = document.getElementById('productAdd')
const addValue = document.getElementById('valueAdd')
const addExistence = document.getElementById('existenceAdd')
const addCategory = document.getElementById('addCategories')
const addImage = document.getElementById('ImageAdd')

document.getElementById("buttonAdd").addEventListener("click", function (event) {
    event.preventDefault()
    let productAdd = addProduct.value
    let valueAdd = addValue.value
    let existenceAdd = addExistence.value
    let addCategories = addCategory.value
    let ImageAdd = addImage.value

    let van = true

    if (productAdd == '' || valueAdd == '' || existenceAdd == '' || ImageAdd == '' || addCategories == '') {
        message.classList.add('fillFields')
        setTimeout(() => { message.classList.remove('fillFields') }, 2500)
        van = false
    }
    else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == productAdd) {
                message.classList.add('repeatedError')
                setTimeout(() => { message.classList.remove('repeatedError') }, 2500)
                van = false
            }
        }
    }

    if (van == true) {
        products.push({
            name: productAdd,
            value: valueAdd,
            existence: existenceAdd,
            category: addCategories, 
            urlImage: ImageAdd
        })        
        message.classList.add('done')
        setTimeout(() => { message.classList.remove('repeatedError') }, 1500)
        window.location.reload()
    }
    saveLocalStorage('products', products);
})



// Editar
const productEd = document.getElementById('productEdit')
const atributoEd = document.getElementById('attributeEdit')
const nuevoAtributoEd = document.getElementById('newAttribute')

document.getElementById("buttonEdit").addEventListener("click", function (event) {
    event.preventDefault()
    let productEdit = productEd.value
    let attributeEdit = atributoEd.value
    let newAttribute = nuevoAtributoEd.value
    let van = false
    if (productEdit == '' || attributeEdit == '' || newAttribute == '') {
        message.classList.add('fillFields')
        setTimeout(() => { message.classList.remove('fillFields') }, 2500)
    }
    else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == productEdit) {
                products[i][attributeEdit] = newAttribute
                van = true
            }
        }
        if (van == true) {
            message.classList.add('done')
            setTimeout(() => {
                message.classList.remove('done')
                window.location.reload()
            }, 1500);
        }
        else {
            message.classList.add('noExisteError')
            setTimeout(() => { message.classList.remove('noExisteError') }, 2500);
        }

        
        saveLocalStorage('products', products);
    }
})

// Eliminar
const productD = document.getElementById('productDelete')

document.getElementById("deleteButton").addEventListener("click", function (event) {
    event.preventDefault()
    let productDelete = productD.value
    let van = false

    for (let i = 0; i < products.length; i++) {
        if (products[i].name == productDelete) {
            products.splice(i, 1)
            van = true
        }
    }

    if (van == false) {
        message.classList.add('noExsiteError')
        setTimeout(() => { message.classList.remove('noExsiteError') }, 2500);
    }
    else {
        message.classList.add('done')
        setTimeout(() => {
            message.classList.remove('done')
            window.location.reload()
        }, 1500);
    }
    saveLocalStorage('products', products);
})

// mostrar products
window.addEventListener("load", () => {
    const productoEd = document.getElementById('productEdit')
    const productoEl = document.getElementById('productDelete')
    for (let i = 0; i < products.length; i++) {
        productoEd.innerHTML += `<option>${products[i].name}</option>`
        productoEl.innerHTML += `<option>${products[i].name}</option>`
    }
    Object.keys(products[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`
    });

    let showsProducts = document.getElementById('showProducts')
    showsProducts.innerHTML = ''
    for (let i = 0; i < products.length; i++) {
        showsProducts.innerHTML += `<div class="productContainer"><img src="${products[i].urlImage}"><div class="information"><p>${products[i].name}</p><p class="precio"><span>Precio: ${products[i].value}$</span><p class="category">${products[i].category}</p></p> Existence: ${products[i].existence}<p></p></div></div>`
    }
})

