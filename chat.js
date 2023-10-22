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

function createMessage(message, attachmentPath){
    var client = isClient();
    if(attachmentPath){
        console.log(attachmentPath)
        console.log(query("INSERT INTO `messages`(`orderId`, `isClient`, `message`, `attachmentPath`) VALUES ('"+getOrder()['id']+"','"+client+"','"+message+"', '"+attachmentPath+"')"))
    }else{
        query("INSERT INTO `messages`(`orderId`, `isClient`, `message`) VALUES ('"+getOrder()['id']+"','"+client+"','"+message+"')")
    }
}

function sendMessage(){
    document.querySelector(".inputArea .attachFilesBtn input").selectedFiles
    var message = document.querySelector('.inputArea .messageInput').value;

    if(message == "") return;

    if(file){
        uploadFile(file, "files/orderData/" + getOrder()['id'], splitFileName(file.name)[0] + time)
        console.log(file)

        baseName = splitFileName(file.name)[0];
        extension = splitFileName(file.name)[1];

        createMessage(message, "files/orderData/" + getOrder()['id'] + "/" + baseName + time + "." + extension);
    }else{
        createMessage(message);
    }
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

    messages.forEach(message =>{
        if(message['isClient']){
            var clone = document.importNode(clientTemplate.content, true);
        }else{
            var clone = document.importNode(providerTemplate.content, true);
        }

        if(message.attachmentPath){
            clone.querySelector("li").classList.add("hasFile");
            clone.querySelector(".fileContainer").href = message.attachmentPath;
            clone.querySelector(".fileContainer p").textContent = getFileNameFromPath(message.attachmentPath)
        }

        clone.querySelector("li").id = message.id;
        clone.querySelector(".container .message").textContent = message['message'];
        clone.querySelector(".container .time").textContent = message['sendTime'];

        myList.appendChild(clone);

    });
}

var file;
var time;
function getChatAttachments(event){
    input = event.target;
    if(input.files){
        file = input.files[0];
        time = new Date().getDate()
        document.querySelector(".inputArea p.attachmentName").textContent = file.name;
        document.querySelector(".inputArea p.attachmentName").style.display = "";
    }
}

window.addEventListener("keydown", function(){
    if(this.event.key == "Enter"){
        sendMessage();
    }
})

function clearChatAttachments(){
    file = undefined;
    time = undefined;
    document.querySelector(".inputArea p.attachmentName").style.display = "none";
    document.querySelector(".inputArea p.attachmentName").textContent = "";
}

renderMessages(getMessages())
