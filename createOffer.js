function initCategoryList(){
    var categories = toJSON(getAllItemsFromTable("categories").responseText);

    optionsList = document.querySelector(".section2 #categoryDropdown");
    categories.forEach(categorie =>{
        option = document.createElement("option");
        option.text = categorie["fullName"];
        optionsList.add(option)
    });
}

function addEmptyFeature(){
    featureList = document.querySelector(".featureList");

    template = featureList.querySelector("template");
    featureList.insertBefore(document.importNode(template.content, true), featureList.firstChild);
}

function deleteFeature(event){
    if(window.confirm("Do you really want to delete this feature?")){
        targetFeature = event.target
        while(targetFeature.tagName != "LI"){
            targetFeature = targetFeature.parentNode;
        }
        targetFeature.remove();
    }
}

function renderImages(event){
    var input = event.target;
    if(input.files){
        var imagesL = input.files;

        imgList = document.querySelector(".imagesField .imageList");
        template = imgList.querySelector("template");
        
        imagesP = [];
        for(var i = 0; i <= imagesL.length-1; i++){
            clone = document.importNode(template.content, true);

            clone.querySelector("li img").src = URL.createObjectURL(imagesL[i]);

            if(imgList.children.length >= 9){imgList.children[imgList.children.length-1].style.display="none"; break }else{imgList.children[imgList.children.length-1].style.display=""}
            imgList.insertBefore(clone, imgList.children[0])
            imagesP.push(imagesL[i])
        }
        if(imgList.children.length >= 9){imgList.children[imgList.children.length-1].style.display="none"; }else{imgList.children[imgList.children.length-1].style.display=""}
    }
}

var titleImageFile;
var imagesP;
function renderTitleImage(event){
    var input = event.target;
    if(input.files[0]){
        titleImageFile = input.files[0];
        document.querySelector(".thumbnailField .thumbnail").src = URL.createObjectURL(input.files[0])
    }
}


function buildOffer(){
    //Collecting information
    var title = document.querySelector("#offerName").value;
    var price = parseFloat(document.querySelector("#price").value);
    var description = document.querySelector("#description").value;
    var category = getCategory(document.querySelector("#categoryDropdown").value).short;
    var subCategory = document.querySelector("#subcategory").value;
    var keywordsRaw = document.querySelector("#keywords").value;
    var keywords = keywordsRaw.replace(" ", "").split(";");
    var features = [];
    var completionTime = parseInt(document.querySelector("#completionTime").value)
    var featureList = document.querySelector(".featureList");
    featureListChildren = [].slice.call(featureList.children)
    featureListChildren.forEach(child =>{
        if(child.tagName == "LI"){
            feature = [];
            feature.push(child.querySelector("#featureTitle").value);
            feature.push(parseFloat(child.querySelector("#featurePrice").value));
            feature.push(parseInt(child.querySelector("#featureDays").value));
            features.push(feature);
        }
    })
    var titlePicture = titleImageFile;
    var images = imagesP;

    //Checking Information
    var missingValues = [];
    var allValues = ["offerName", "price", "description", "categoryDropdown", "keywords", "addFeatureBtn", "thumbnailImg", "imageList", "completionTime"]

    if(!title || title.replace(" ", "").length < 1) missingValues.push("offerName");
    if(!price || price <= 0) missingValues.push("price");
    if(!description || description.replace(" ", "").length < 1) missingValues.push("description");
    if(!getCategory(category)) missingValues.push("categoryDropdown");
    if(!keywords || keywords.length < 1 || keywords[0] == '') missingValues.push("keywords");
    if(!features || features.length < 1) missingValues.push("addFeatureBtn")
    if(!titlePicture) missingValues.push("thumbnailImg");
    if(!images || images.length < 1) missingValues.push("imageList")
    if(!completionTime || completionTime <= 0) missingValues.push("completionTime")

    allValues.forEach(element =>{
        document.querySelector("#"+element).classList.remove("missing");
    })
    missingValues.forEach(element =>{
        try{
        document.querySelector("#"+element).classList.add("missing");}
        catch(err){
            console.error(err);
        }
    })
    if(missingValues.length > 0) return;

    //Making Information Database compatible
    var keywords_ = arrayToString(keywords);
    var stringFeatures = [];
    features.forEach(element =>{stringFeatures.push(element.join("?"))})
    var features_ = features.join(";");

    //Checking if same offer exists
    offers = toJSON(getAllItemsFromTable("offers", " WHERE `title`='"+title+"' AND `categoryShort`='"+category+"'").responseText, true)
    if(offers.length>0){
        console.log(offers)
        return;
    }

    //Adding Database table record
    query("INSERT INTO `offers`(`title`, `userName`, `categoryShort`, `price`, `description`, `isOffer`, `completionTime`) VALUES ('"+ title +"','"+ getUser().fullName +"','"+ category +"','"+ price +"','"+ description +"','1','"+ completionTime +"')")
    offerId = toJSON(getAllItemsFromTable("offers", " WHERE `userName`='"+getUser().fullName+"' AND `title`='"+title+"' AND `description`='"+description+"' AND `categoryShort`='"+category+"'").responseText)[0].id;
    
    //Saving Pictures on webserver
    try{
    images.forEach(element => {
        try{
            query("UPDATE `offers` SET `picture"+(images.indexOf(element)+1)+"`='/files/offerData/"+offerId+"/images/"+element.name+"' WHERE id='"+offerId+"'")
        }catch{console.log(element)}
    })}catch{}
    uploadFile(titlePicture, "/files/offerData/"+offerId, "thumbnail");
    query("UPDATE `offers` SET `thumbnail`='/files/offerData/thumbnail."+splitFileName(titlePicture.name)[1]+"' WHERE id='"+offerId+"'")

    //Saving features and keywords
    query("UPDATE `offers` SET `features`='"+features_+"', `keywords`='"+keywords_+"' WHERE id='"+offerId+"'").responseText

    window.alert("Offer successfulyy created!");
    window.location.href = "userSettings.html"



    //----------------------------------------------------------------------------------------------------------------------------------------------
    // GET FEATURES AGAIN---------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------------
    // features = [];
    // features_.split(";").forEach(element => {
    //     splitElement = element.split(",")
    //     splitElement[1] = parseFloat(splitElement[1]);
    //     splitElement[2] = parseFloat(splitElement[2]);
    //     features.push(splitElement);
    // })
    //---------------------------------------------------------------------------------------------------------------------------------------------
}   

//--------------------------------------------------------------------------------------------------------------------------------------------------
// ENABLE WHEN PUBLISHING---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------
// window.addEventListener("beforeunload", function (e) {
//     e.preventDefault();
//     e.returnValue = '';
//     (e || window.event).returnValue = confirmationMessage; // Standard-basierte Browsersupport
//     return confirmationMessage; // IE-Support
// });

initCategoryList();