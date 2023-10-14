function loadUI(){
    user = getUser()[0];

    document.querySelector(".generalInformationTab .nameField input").value = user['fullName'];
    document.querySelector(".generalInformationTab .emailField input").value = user['emailAddress'];
    document.querySelector(".generalInformationTab .phoneNumberField input").value = user['phoneNumber'];
    document.querySelector(".generalInformationTab .descriptionField textArea").value = user['description'];
}

function saveChanges(){
    fullName = document.querySelector(".generalInformationTab .nameField input").value;
    emailAddress = document.querySelector(".generalInformationTab .emailField input").value;
    phoneNumber = document.querySelector(".generalInformationTab .phoneNumberField input").value;
    description = document.querySelector(".generalInformationTab .descriptionField textArea").value;

    if(fullName == ""){
        window.alert("Please enter a valid name!");
        return;
    }
    if(!isValidEmail(emailAddress)){
        window.alert("Please enter a valid email address!");
        return;
    }
    if(containsNonDigits(phoneNumber)){
        window.alert("Please only use numbers in the phone number field!")
        return;
    }else{ phoneNumber = parseInt(phoneNumber); }

    query("UPDATE `user` SET `fullName`='"+fullName+"',`emailAddress`='"+emailAddress+"',`description`='"+description+"',`phoneNumber`='"+phoneNumber+"' WHERE `user`.`id` = "+getUser()[0]['id']);
}

function containsNonDigits(str) {
  const nonDigitPattern = /[^0-9]/;
  return nonDigitPattern.test(str);
}

function deleteUser(){
    if(window.confirm("Do you really want to delete your account. This cant be undone. All your orders will be canceled")){
        query("DELETE FROM `user` WHERE id="+getUser()[0]['id']);

        window.location.href ="index.html"
    }
}

function showPage(index){
    hideAllPages();
    if(index == 0){
        generalInfoPage.style.display = "";
        generalInfoPageHeader.classList.add('active');
    }else if(index == 1){
        myOffersPage.style.display = "";
        myOffersPageHeader.classList.add('active');
    }
}
function hideAllPages(){
    generalInfoPage.style.display = "none";
    myOffersPage.style.display = "none";
    myOffersPageHeader.classList.remove('active');
    generalInfoPageHeader.classList.remove('active');
}

function getAllOrders(){
    var maxOffers = 20;
    var maxOrdersPerOffer = 10
    user = getUser()[0];

    offers = toJSON(getAllItemsFromTable("offers", " WHERE userName='" + user['fullName'] + "'").responseText)
    
    i = 0
    offers.forEach(offer => {
        if(i < maxOffers){
            orders = []
            orders.push(toJSON(getAllItemsFromTable("orders", " WHERE `itemId`="+offer['id']).responseText))
            if(orders[0][0] != 'K'){
                renderOffer(offer['title'], orders[0], maxOrdersPerOffer)
            }
            i+=1;
        }
    });

}

function getRemainingTime(orderId){
    var order = toJSON(getAllItemsFromTable("orders", " WHERE orderId=" + orderId).responseText)[0];
    var startDate = new Date(order['startTime'])

    var offer = toJSON(getAllItemsFromTable("offers", " WHERE id=" + order['itemId']).responseText)[0];
    var completionTime = offer['completionTime'];

    var currentDate = new Date();

    var timeDiff = new Date(startDate.getTime() + (completionTime * 24 * 60 * 60 * 1000) - currentDate.getTime());
    var remainingDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

    return remainingDays;
}

function renderOffer(name, orders, maxOrdersPerOffer){
    const myList = document.querySelector('.myOffersTab .allOffers');
    
    var template = myList.querySelector('template');
    
    var clone = document.importNode(template.content, true);

    const myListTwo = clone.querySelector('.orders');
    var templateTwo = myListTwo.querySelector('template');
    
    clone.querySelector('.offersLi').querySelector('.offerName').textContent = name;
    
    i = 0
    orders.forEach(order =>{
        if(i < maxOrdersPerOffer){
            cloneTwo = document.importNode(templateTwo.content, true);

            cloneTwo.querySelector(".ordersLi").id = order['orderId'];
            cloneTwo.querySelector(".ordersLi").querySelector(".clientName").textContent = getUser(order['clientId'])[0]['fullName']
            cloneTwo.querySelector(".ordersLi").querySelector(".infos .remainingTime").textContent = getRemainingTime(order['orderId']) + " days remaining";

            myListTwo.appendChild(cloneTwo);
            i+=1
        }
    });

    myList.appendChild(clone);
}

function openChat(event){
    parent = event.target;
    while(parent.tagName != "LI"){
        parent = parent.parentNode
    }
    id = parseInt(parent.id);

    window.location.href = "chat.html" + "?orderId=" + id;
}



generalInfoPage = document.querySelector("main .right .tabs .generalInformationTab");
myOffersPage = document.querySelector("main .right .tabs .myOffersTab");
generalInfoPageHeader = document.querySelector("main .left .tabList #generalInfoHeader");
myOffersPageHeader = document.querySelector("main .left .tabList #myOffersHeader");
if(getUser() != "Keine Angebote gefunden."){
    loadUI();
    showPage(1);
}
else{
    window.location.href ="logIn.html?from=userSettings";
}

getAllOrders();
