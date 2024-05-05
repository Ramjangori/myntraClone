
let bagItemObject;
let date= new Date;
let dilivaryDate = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let finalDate = `${dilivaryDate + 4} : ${month} : ${year}`;




onLoad();

function  onLoad(){
    loadBagItemObject();
    displayBagItems();
    displayBagSummary()
    
}
function loadBagItemObject(){
    bagItemObject = bagItems.map(itemId=>{
        for(let i=0; i<items.length; i++){
            if(itemId==items[i].id){
                return items[i];
            }
        }
    })

};
function displayBagSummary(){
  let summary = document.querySelector(".bag-summary");
  let totalItem =bagItemObject.length;
  let totalMRP = 0;
  let discount= 0;
  let totalAmount=0;
  bagItemObject.forEach(item=>{
    totalMRP += item.original_price;
    discount += item.original_price - item.current_price;
    totalAmount = totalMRP - discount + 99 ;
  })
  summary.innerHTML=`<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs${discount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${totalAmount}</span>
  </div>
</div>
<button class="btn-place-order" onclick="orderPlaced()">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;



}
function displayBagItems(){
    let containerElement =  document.querySelector(".bag-items-container");
    let innerHTML= '';
    bagItemObject.forEach(bagItem=> {
        innerHTML += generateItemHtml(bagItem);
        
    });
    containerElement.innerHTML=innerHTML;
}
 function removeFromBag(itemId){
     bagItems = bagItems.filter(bagItemId => bagItemId!=itemId);
     localStorage.setItem('bagItems',JSON.stringify(bagItems));
     loadBagItemObject();
     displayBagItems();
     displayBagIcon();
     displayBagSummary();
 }
 function orderPlaced(){
  let btn = document.querySelector(".btn-place-order");
  if(bagItemObject.length>0){
    alert("Ordered Sucessfully")
    
  }
  else{
    alert("plz chhose atleast One item");
  }
 }
function generateItemHtml(item)
{
    return  `  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs${item.current_price}</span>
        <span class="original-price">Rs${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">14 days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days"> ${finalDate}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>

</div>`
}