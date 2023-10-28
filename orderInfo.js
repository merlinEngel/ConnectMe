function renderInformation(){
    orderId = new URL(window.location.href).searchParams.get("id");
    order = toJSON(getAllItemsFromTable("orders", " WHERE `id`='"+orderId+"'").responseText)[0]
    offer = toJSON(getAllItemsFromTable("offers", " WHERE `id`='"+order.itemId+"'").responseText)[0]

    client = toJSON(getAllItemsFromTable("users", " WHERE `id`='"+order.clientId+"'").responseText) [0]
    document.querySelector(".left .clientName .value").textContent = client.fullName;
    document.querySelector(".left .remainingTime .value").textContent = getRemainingTime(orderId) + " days"
    document.querySelector(".left .price .value").textContent = getOrderPrice(orderId) + "$"

    featureList = document.querySelector("ul.featureList");

    template = featureList.querySelector("template");

    bookedFeatures = [];
    order.features.split(";").forEach(element =>{
        bookedFeatures.push(offer.features.split(";")[element].split(",")[0])
    })
    bookedFeatures.forEach(element =>{
        clone = document.importNode(template.content, true);
        clone.querySelector("li .featureName").textContent = element;
        featureList.appendChild(clone)
    })
}

function getOrderPrice(id){
    order = toJSON(getAllItemsFromTable("orders", " WHERE `id`='"+id+"'").responseText)[0];
    offer = toJSON(getAllItemsFromTable("offers", " WHERE `id`='"+order.itemId+"'").responseText)[0]

    basePrice = parseFloat(offer.price);
    featurePrices = []
    order.features.split(";").forEach(element =>{
        featurePrices.push(parseFloat(offer.features.split(";")[element].split(",")[1]))
    })
    fullPrice = basePrice;
    featurePrices.forEach(element => {fullPrice += element})

    return fullPrice;
}

orderId = new URL(window.location.href).searchParams.get("id");
order = toJSON(getAllItemsFromTable("orders", " WHERE `id`='"+orderId+"'").responseText)[0]
getOrderPrice(orderId)
if(order.providerId != getUser().id) window.location.href = "index.html"
renderInformation()