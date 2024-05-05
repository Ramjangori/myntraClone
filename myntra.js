let bagItems;
let bagbtn = document.querySelector(".btn-add-bag");
onload();

function onload(){
    let bagItemStr = localStorage.getItem('bagItems');
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
displayitems();
displayBagIcon();
}
function addToBag(itemId) {
    
    let order =  confirm(" for get this item press Ok ");
    if(order){
        alert("ordered sucess");
        bagItems.push(itemId);
        localStorage.setItem('bagItems',JSON.stringify(bagItems));
        displayBagIcon();
    }
    else{
        alert("order not sucess");
    }
   
    displayBagIcon();



}
function displayBagIcon(){
    let bagItemCountElement = document.querySelector(".bag-item-count");
    if(bagItems.length>0)
{bagItemCountElement.innerText = bagItems.length; 
    bagItemCountElement.style.visibility = "visible";}
else
{
    bagItemCountElement.style.visibility = "hidden";
}
    
}

function displayitems() {
    let itemsContainerElement = document.querySelector('.items-container');
    if(!itemsContainerElement){
        return;
    }
let innerHtml = '';
items.forEach((item)=>{
    innerHtml +=`<div class="item-container">
    <img src="${item.image}" class="item-image" alt="item">
    <div class="rating">
        ${item.rating.stars} ⭐ ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price"> Rs ${item.current_price}</span>
        <span class="original-price"> Rs ${item.original_price}</span>
        <span class="discount">${item.discount_percentage}%Off</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`

});
itemsContainerElement.innerHTML= innerHtml;

 }

