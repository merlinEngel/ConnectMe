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
    var user = getUser(item.userName);

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

    document.querySelector('main .wrapper .left .userInfo .topLine .userName').textContent = user.fullName;
    document.querySelector('main .wrapper .left .userInfo .description').textContent = user.description;
    document.querySelector('main .wrapper .left .userInfo .topLine .queuedOrders').textContent = getQeuedOrders(user.id) + " Orders in Queue";

    var ratingList = document.querySelector(".rating ul");
    var fullStar = document.querySelector(".rating template.fullStar");
    var halfStar = document.querySelector(".rating template.halfStar");
    var emptyStar = document.querySelector(".rating template.emptyStar");

    var renderedStars = 0;
    var averageRating = getAverageRating(user.id);
    const maxStars = 5;

    for(let i = averageRating; i > .5; i--){
        renderedStars++;
        ratingList.appendChild(document.importNode(fullStar.content, true));
    }
    if(averageRating - renderedStars > 0){
        ratingList.appendChild(document.importNode(halfStar.content, true));
        renderedStars++;
    }
    if(renderedStars < maxStars){
        for(let i = renderedStars; i < maxStars; i++){
            ratingList.appendChild(document.importNode(emptyStar.content, true));
        }
    }

    document.querySelector(".userInfo .topLine img").src = getProfilePicturePath(user.id)
}

function orderItem(){
    xhr = query("INSERT INTO orders (clientId, providerId, itemId, isOffer) VALUES ('"+getUser()[0]['id']+"', '"+1+"', '"+parseInt(getItem()[0].id)+"', '"+getItem()[0].isOffer+"')")

    console.log(xhr.responseText);
}

showItem(getItem());
