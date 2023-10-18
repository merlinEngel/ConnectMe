function getOrder(){
    id = new URL(window.location.href).searchParams.get("orderId");

    order = toJSON(getAllItemsFromTable("orders", " WHERE id="+id).responseText)[0];
    return order;
}
if(getUser()['id'] == getOrder()['clientId'] || getUser()['id'] == getOrder()['providerId']){}
else{
    window.location.href = "index.html"
}


function isClient(){
    if(getUser()['id'] == getOrder()['clientId']){
        return true;
    }else{
        return false;
    }
}

function createMessage(message){
    var client = isClient();

    console.log("INSERT INTO `messages`(`orderId`, `isClient`, `message`) VALUES ('"+getOrder()['id']+"','"+client+"','"+message+"')")
    console.log(query("INSERT INTO `messages`(`orderId`, `isClient`, `message`) VALUES ('"+getOrder()['id']+"','"+client+"','"+message+"')").responseText)
}

function sendMessage(){
    var message = document.querySelector('.inputArea .messageInput').value;

    if(message == "") return;

    createMessage(message);
    document.querySelector('.inputArea .messageInput').value = "";

    renderMessages(getMessages())
}

function getMessages(){
    orderId = getOrder()['id'];

    messages = toJSON(getAllItemsFromTable("messages", " WHERE orderId="+orderId).responseText);

    return messages
}

function renderMessages(messages){
    var myList = document.querySelector('.chatArea ul');
    for (let i = myList.children.length - 1; i >= 0; i--) {
        const child = myList.children[i];
        if (child.tagName.toLowerCase() !== 'template') {
            myList.removeChild(child);
        }
    }

    var clientTemplate = document.querySelector(".chatArea ul template#client");
    var providerTemplate = document.querySelector(".chatArea ul template#provider");

    messages.forEach(element =>{
        if(element['isClient']){
            var clone = document.importNode(clientTemplate.content, true);
        }else{
            var clone = document.importNode(providerTemplate.content, true);
        }

        clone.querySelector(".container .message").textContent = element['message'];
        clone.querySelector(".container .time").textContent = element['sendTime'];

        myList.appendChild(clone);
    });
}

window.addEventListener("keydown", function(){
    if(this.event.key == "Enter"){
        sendMessage();
    }
})

renderMessages(getMessages())
