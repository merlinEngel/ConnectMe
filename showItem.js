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
    var user = getUserByName(item.userName)[0];

    document.querySelector('main h3').textContent = item.title;
    document.querySelector('main .wrapper .left .userInfo .topLine .userName').textContent = item.userName;
    document.querySelector('main .wrapper .right .topContainer .info .description').textContent = item.description;
    document.querySelector('main .wrapper .right .lowerContainer .cost .data').textContent = item.price + "$";
    if(getItemInformation()[1] == 1){
        document.querySelector('main .wrapper .right .lowerContainer .completionTime .data').textContent = item.completionTime + " d";
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

    pictures = [item.thumbnail, item.picture1, item.picture2, item.picture3, item.picture4, item.picture5];
    console.log(pictures)

    mainImage = document.querySelector(".images .mainImage");
    imgTemplate = document.querySelector(".images template");
    imgList = document.querySelector(".images ul");
    pictures.forEach(element => {
        if(element != null){
            console.log(element)
            clone = document.importNode(imgTemplate.content, true)
            clone.querySelector("img").src = "/connectMe"+element;
            
            imgList.appendChild(clone);
        }
    })
    imgList.getElementsByTagName("li")[0].classList.add("active");
    mainImage.src = "/connectMe"+pictures[0]

    features = [];
    item.features.split(";").forEach(element => {
        splitElement = element.split(",")
        splitElement[1] = parseFloat(splitElement[1]);
        splitElement[2] = parseFloat(splitElement[2]);
        features.push(splitElement);
    })
    featureList = document.querySelector(".featureList");
    template = featureList.querySelector("template");
    features.forEach(feature =>{
        clone = document.importNode(template.content, true);

        clone.querySelector(".featureName").textContent = feature[0];
        if(feature[1] <= 0 && feature[2] <= 0){
            clone.querySelector("input").style.display = "none"
            clone.querySelector(".featureName").style.marginLeft = "1.3vw"
            clone.querySelector(".featurePrice").textContent = "INCLUDED";
            clone.querySelector("input").checked = true
        }else if(feature[1] <= 0){
            clone.querySelector(".featurePrice").textContent = "FREE";
            clone.querySelector(".featureTime").textContent = feature[2] + "d"
        }else{
            clone.querySelector(".featureTime").textContent = feature[2] + "d"
            clone.querySelector(".featurePrice").textContent = feature[1] + "$"
        }

        featureList.appendChild(clone)
    })
}
function switchFeatureList(e){
    featureList = document.querySelector(".featureList");
    
    if(featureList.style.display == ""){featureList.style.display = "none"; e.target.style.transform="rotate(-90deg)"}
    else{featureList.style.display = ""; e.target.style.transform=""}
}

function getCheckedFeatures(){
    item = getItem();

    var featureList = document.querySelector(".featureList");
    var listEntrys = Array.from(featureList.children);

    var checkedFeatures = [];
    listEntrys.forEach(element =>{
        if(element.tagName != "LI"){}else{
        // if(element.querySelector(".featurePrice") == "INCLUDED"){checkedFeatures.push(listEntrys.indexOf(element));}
        if(element.querySelector("input").checked){checkedFeatures.push(listEntrys.indexOf(element));}
    }})

    return checkedFeatures;
}

function setPicture(event){
    imgListItems = document.querySelector(".images ul").getElementsByTagName("li");
    for(var i = 0; i < imgListItems.length; i++){
        try{
            imgListItems[i].classList.remove('active'); 
        }catch{}
    }

    event.target.parentNode.classList.add("active");
    mainPicture = document.querySelector(".images .mainImage");
    mainPicture.src = event.target.src;
}

function orderItem(){
    features = getCheckedFeatures();
    xhr = query("INSERT INTO orders (clientId, providerId, itemId, isOffer, features) VALUES ('"+getUser()[0]['id']+"', '"+1+"', '"+parseInt(getItem()[0].id)+"', '"+getItem()[0].isOffer+"', '"+features.join(";")+"')")
}

showItem(getItem());
