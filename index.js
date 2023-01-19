

import { menuArray} from './data.js'

const paymentForm = document.getElementById('payment-form') //the submit button in the form works for this

// 6. Create event listener that listen to clicks when an item is selected

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addSelectedItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        removeSelectedItem(e.target.dataset.remove)
    }
    else if(e.target.id === 'order-btn'){
        getPaymentDetails()
    }
})


// 3. Get the selected items, match them with the items in the menu (filter by id), 
//then push its object to an array and finally, render the order

let orderArray = []

function addSelectedItem(selectedItemId){
    const targetItemObj = menuArray.filter(function(selectedItem){
        return selectedItem.id == selectedItemId
    })[0]

    orderArray.push(targetItemObj)
    renderHtmlOrder()

    //To check if any item has been selected in the orderArray, unhide the order container

    if(orderArray!=0){
        document.getElementById('order-info').classList.remove('hidden')
    }


}

// 7. Function that removes seleted items

function removeSelectedItem(index){
    orderArray.splice(index, 1) //removes 1 item fromm the array at position index
    renderHtmlOrder()

    //if the array is empty, hide the container

    if(orderArray.length === 0){
        document.getElementById('order-info').classList.add('hidden')
    }
}




// 4. Generate the Html element by iterating over orderArray based on the items selected

function handleHtmlOrder(){
    let totalPrice = 0
    let orderHtml = 
    `
    <h3 class="order-title">Your order</h3>
    `
    orderArray.forEach(function(orderItem, index){

        orderHtml +=
        `
        <div class ="order-line">
            <h3>${orderItem.name}</h3>
            <p class ="remove-btn" data-remove = '${index}'>remove</p>
            <h3 class ="price">$${orderItem.price}</h3>
        </div>
        `

        totalPrice += orderItem.price
    })


    orderHtml +=
    `
    <hr>
    <div class ="total-price-line">
        <h3>Total price:</h3>
        <h3 class = "total-price">$${totalPrice}</h3>
    </div>
    <button class = "order-btn" id = "order-btn">Complete order</button>
    `
    return orderHtml
}

//5. Render the order made to the Html order section

function renderHtmlOrder(){
    document.getElementById('order-info').innerHTML = handleHtmlOrder()
}



// 1. Get the menu from HTML

function getMenuHtml(){

    let menuHtml = ``

    menuArray.forEach(function(item){
        menuHtml += `
        <div class="food-container">
            <div class="menu">
                <div>
                    <img src="${item.img}" alt="pizza">
                </div>
                <div class="food-text">
                    <h3 class="menu-text">${item.name}</h3>
                    <p class="ingredients">${item.ingredients}</p>
                    <h3>${item.price}</h3>
                </div>
            </div>
            <div class="btn-container">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>
        </div>
        `
    })
    return menuHtml
}



// 2. Create a function that renders the HTML menu

function render(){
    document.querySelector('.section-container').innerHTML = getMenuHtml()
}
render()



// 8. Create a function that brings out the payment container and get the payment details

function getPaymentDetails(){
    document.getElementById('payment-container').style.display = "inline"
}

paymentForm.addEventListener('submit', function(e){
    e.preventDefault() //to prevent default form behaviour from displaying input data in URL

    document.getElementById("payment-container").innerHTML = 
    `
        <div class="payment-container-loading">
            <image src ="/images/giphy.gif" class="loading-gif">
        </div> 
    `

    // setTimeout(function(){
    //     document.getElementById('loading-text').innerText = 'Saving ...'
    // },1500)

    setTimeout(function(){
        document.getElementById('payment-container').style.display = "none"
    }, 3500)

    const paymentFormData = new FormData(paymentForm)
    const customerName = paymentFormData.get('orderName') // to be used for the final message

    setTimeout(function(){
        document.getElementById('order-info').innerHTML=
            `
            <h2 class="order-message">Thank you for your order,  <span class="customer-name">${customerName}</span>!</h2>
            ` 
    },3500)
})



// 9. Get the close button to get rid of the payment container

document.getElementById('payment-close-btn').addEventListener('click',function(){
    document.getElementById('payment-container').style.display = "none"
})


