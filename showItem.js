function getItem(){
    var itemInfo = getItemInformation();

    var itemId = itemInfo[0];
    var itemType = itemInfo[1];

    if (itemType == 1){
        itemType = "offers";
    }else{
        itemType = "requests";
    }

    xhr = query("SELECT * FROM "+itemType+" WHERE id='"+itemId+"'")

    if (xhr.readyState === 4 && xhr.status === 200) {
        try{
            return JSON.parse(xhr.responseText);
        }catch{
            console.error("JSON Error:"+xhr.error);
        }
    }
}

function getItemInformation(){
    var url = new URL(window.location.href);

    return [url.searchParams.get('id'), url.searchParams.get('type')];
}

function showItem(item){
    console.log(getItemInformation()[1])

    document.querySelector('main h3').textContent = item[0].title;
    document.querySelector('main .wrapper .left .userInfo .topLine .userName').textContent = item[0].userName;
    document.querySelector('main .wrapper .right .topContainer .info .description').textContent = item[0].description;
    document.querySelector('main .wrapper .right .lowerContainer .cost .data').textContent = "from " + item[0].price + "$";
    if(getItemInformation()[1] == 1){
        document.querySelector('main .wrapper .right .lowerContainer .completionTime .data').textContent = item[0].completionTime + " days";
    }else{
        document.querySelector('main .wrapper .right .lowerContainer .completionTime').style.display = "none";
        document.querySelector('main .wrapper .right .lowerContainer .avrgRating').style.display = "none";
    }

    var user = getUser(item.userName);

    document.querySelector('main .wrapper .left .userInfo .topLine .userName').textContent = user.fullName;
}

function orderItem(){
    xhr = query("INSERT INTO orders (clientId, providerId, itemId, isOffer) VALUES ('"+getUser()[0]['id']+"', '"+1+"', '"+parseInt(getItem()[0].id)+"', '"+getItem()[0].isOffer+"')")

    console.log(xhr.responseText);
}

showItem(getItem());
