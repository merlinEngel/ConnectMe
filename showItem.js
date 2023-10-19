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
            return JSON.parse(xhr.responseText)[0];
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
    console.log(item)
    var user = getUserByName(item.userName)[0];

    document.querySelector('main h3').textContent = item.title;
    document.querySelector('main .wrapper .left .userInfo .topLine .userName').textContent = item.userName;
    document.querySelector('main .wrapper .right .topContainer .info .description').textContent = item.description;
    document.querySelector('main .wrapper .right .lowerContainer .cost .data').textContent = "from " + item.price + "$";
    if(getItemInformation()[1] == 1){
        document.querySelector('main .wrapper .right .lowerContainer .completionTime .data').textContent = item.completionTime + " days";
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

    pictures = [item.picture1, item.picture2, item.picture3, item.picture4, item.picture5];

    mainImage = document.querySelector(".images .mainImage");
    imgTemplate = document.querySelector(".images template");
    imgList = document.querySelector(".images ul");
    pictures.forEach(element => {
        if(element != null){
            
            clone = document.importNode(imgTemplate.content, true)
            clone.querySelector("img").src = element;
            if(pictures.indexOf(element) == 0){
            }
            imgList.appendChild(clone);
        }
    })
    imgList.getElementsByTagName("li")[0].classList.add("active");


    console.log(user)
}

function setPicture(event){
    imgListItems = document.querySelector(".images ul").getElementsByTagName("li");
    for(var i = 0; i < imgListItems.length; i++){
        console.log(imgListItems[i].classList);
        try{
            imgListItems[i].classList.remove('active'); 
        }catch{}
    }

    event.target.parentNode.classList.add("active");
    mainPicture = document.querySelector(".images .mainImage");
    mainPicture.src = event.target.src;
}

function orderItem(){
    xhr = query("INSERT INTO orders (clientId, providerId, itemId, isOffer) VALUES ('"+getUser()[0]['id']+"', '"+1+"', '"+parseInt(getItem()[0].id)+"', '"+getItem()[0].isOffer+"')")

    console.log(xhr.responseText);
}

showItem(getItem());
