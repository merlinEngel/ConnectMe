//#region Database Test generation
const serviceNames = [
    'Web Design', 'SEO Optimization', 'Mobile App Development', 'Graphic Design',
    'Content Writing', 'E-commerce Solutions', 'Social Media Marketing', 'UI/UX Design',
    'Logo Design', 'Software Development', 'Data Analysis', 'Video Editing', 'Photography',
    'Project Management', 'Digital Marketing', 'Copywriting', 'Illustration', 'Consulting',
    'Database Management', 'Network Security', 'IT Support', 'Event Planning', 'Market Research',
    'Content Strategy', 'Brand Identity', 'Financial Analysis', 'Legal Services', 'Translation',
    'Art Direction', 'Game Development', 'Interior Design', 'Public Relations', 'Fitness Training',
    'Home Renovation', 'Travel Planning', 'Event Photography', 'App Testing', 'Gardening Services',
    'Catering', 'Fashion Design', 'Personal Coaching', 'Financial Planning', 'Online Coaching',
    'Virtual Assistance', 'Tutoring', 'Wedding Planning', 'Home Cleaning', 'Auto Repair',
    'Lawn Care', 'Real Estate Services', 'Home Inspection', 'Healthcare Consulting',
    'Personal Styling', 'Career Coaching', 'Nutrition Coaching', 'Dog Walking', 'Babysitting',
    'House Painting', 'Pet Grooming', 'Handyman Services', 'Car Detailing', 'Wedding Photography',
    'Computer Repair', 'Yoga Instruction', 'Massage Therapy', 'Fitness Classes', 'Party Planning',
    'Landscaping', 'Accounting Services', 'Tax Preparation', 'Home Organizing', 'Life Coaching',
    'Acupuncture', 'Music Lessons', 'Language Tutoring', 'Life Coaching', 'House Sitting',
    'Auto Maintenance', 'Home Repairs', 'Carpentry', 'Dry Cleaning', 'House Cleaning',
    'Personal Training', 'Pest Control', 'Window Cleaning', 'Electrician Services', 'Plumbing',
    'Photobooth Rental', 'DJ Services', 'Limo Services', 'Catering Services', 'Event Coordination',
    'Photo Booth Rental', 'Graphic Design', 'Printing Services', 'Photography Services',
    'Flower Arrangement', 'Culinary Classes', 'Cooking Classes', 'Food Delivery', 'Barista Services',
    'Bike Repair', 'Guitar Lessons', 'Painting Classes', 'Fitness Coaching', 'Personal Chef',
    'Pottery Classes', 'Wine Tasting', 'Personal Shopping', 'Massage Services', 'Nutritionist',
    'Home Theater Installation'
];

const americanNames = [
  'John Smith', 'Alice Johnson', 'Michael Williams', 'Emily Brown', 'David Jones',
  'Olivia Miller', 'James Davis', 'Sophia García', 'Robert Martinez', 'Emma Taylor',
  'William Anderson', 'Charlotte Wilson', 'Daniel Moore', 'Ava Jackson', 'Joseph White',
  'Mia Harris', 'Charles Lee', 'Amelia Turner', 'Matthew Harris', 'Ella Lewis',
  'Alexander Hall', 'Lily Martin', 'Andrew Clark', 'Grace Walker', 'Henry Young',
  'Chloe King', 'Jacob Baker', 'Sophia Reed', 'Samuel Wright', 'Abigail Adams',
  'Ethan Scott', 'Madison Nelson', 'Benjamin Evans', 'Harper Thomas', 'Christopher Turner',
  'Elizabeth Allen', 'Sebastian Green', 'Sofia Evans', 'Jack Mitchell', 'Scarlett Baker',
  'William Parker', 'Hannah Moore', 'Nicholas King', 'Addison Hill', 'Aiden Roberts',
  'Natalie Martinez', 'Owen Johnson', 'Zoe Parker', 'Carter Davis', 'Nora Lewis',
  'Matthew Thompson', 'Ella Turner', 'Leo Adams', 'Grace Young', 'Julian Harris',
  'Avery Walker', 'Lucas Wilson', 'Riley Mitchell', 'Leah Smith', 'Jayden Miller',
  'Samantha Thomas', 'Wyatt Davis', 'Isabella Brown', 'Hunter Clark', 'Layla Martin',
  'Isaac White', 'Madelyn Wright', 'Elijah Wilson', 'Audrey Nelson', 'Daniel Turner',
  'Ellie Taylor', 'Joseph Green', 'Aria Mitchell', 'Jack Wright', 'Liam Smith',
  'Aubrey Allen', 'Luke Turner', 'Aurora Harris', 'Gavin King', 'Mila Hall',
  'David Hernandez', 'Levi Turner', 'Hazel King', 'James Thompson', 'Stella Moore',
  'Elijah Reed', 'Victoria Baker', 'Benjamin Young', 'Nova Walker', 'Henry Adams',
  'Zara Harris', 'Lucas Martin', 'Paisley Clark', 'William Allen', 'Luna Turner',
  'Jackson White', 'Willow Davis', 'Oliver Martinez', 'Ivy Anderson', 'Caleb Hill',
  'Evelyn Garcia', 'Logan Thomas', 'Scarlett Smith', 'Michael Baker', 'Abigail Wilson',
  'Grayson Turner', 'Chloe Moore', 'Mason Wright', 'Sophie Johnson', 'Cameron Lewis',
  'Harper Hall'
];

const prices = [
  45.67, 89.99, 32.50, 115.00, 72.75, 149.99, 18.95, 75.00, 99.50, 60.00,
  110.25, 37.80, 25.99, 95.25, 124.50, 15.75, 88.00, 42.35, 175.50, 10.99,
  135.00, 47.25, 82.50, 67.80, 150.00, 29.95, 63.75, 115.50, 22.00, 76.99,
  42.50, 99.99, 54.75, 110.00, 30.25, 159.00, 11.50, 92.45, 66.25, 145.00,
  19.99, 78.50, 37.75, 121.00, 88.95, 58.00, 105.25, 13.50, 72.00, 49.99,
  90.75, 25.00, 115.00, 34.95, 70.50, 139.00, 65.25, 55.00, 11.25, 95.99,
  40.50, 80.25, 29.00, 160.00, 22.75, 125.50, 45.99, 73.00, 38.25, 110.00,
  10.00, 87.95, 69.50, 120.75, 57.00, 30.99, 102.50, 14.75, 84.00, 33.25,
  148.00, 61.99, 20.50, 100.25, 76.00, 46.95, 112.50, 17.25, 68.00, 40.99,
  130.00, 24.75, 94.50, 50.95, 85.00, 27.25, 75.99, 31.50, 140.00, 63.99
];

const categories = toJSON(getAllItemsFromTable("categories").responseText);

for (let i = 0; i < 10000; i++) {
    
        const serviceName = serviceNames[i % serviceNames.length];
        const price = prices[i % prices.length];
        const categorie = categories[i % categories.length];

        // if(i%2 == 0){
        //     createOffer(serviceName, "Merlin Engel", price, getCategory(categorie)["short"], "None");
        // }else{
        //     createRequest(serviceName, "Merlin Engel", price, getCategory(categorie)["short"], "None");
        // }
}
//#endregion
var requestsPerPage = 50;
var currentPage = 1;
var pageText = document.querySelector('.pageText')

function nextPage(){
    if(currentPage + 1 <= filterItems(getAllOffersFromDb(), getAllRequestsFromDb()).length/requestsPerPage){
        currentPage = currentPage + 1;
        generateList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
        pageText.textContent = currentPage;
    }
}
function lastPage(){
    if(currentPage - 1 > 0){
        currentPage = currentPage - 1;
        generateList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
        pageText.textContent = currentPage;
    }
}
function updatePage(){
    clearList();
    renderList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
}

function renderList(items){
    var currentPage = this.currentPage;
    var requestsPerPage = this.requestsPerPage;

    if(items.length == 0){
        document.querySelector(".notFoundSection").style.display = ""
    }
    
    if (currentPage < 1){
        x = 0
    }
    else{
        x = 1
    }
    
    if(items.length <= 1){
        console.assert("No items to render");
        return;
    }
    
    for (let i = requestsPerPage*(currentPage-1); i < requestsPerPage*(currentPage); i++) {
        try{
            const myList = document.querySelector('.requestList ul');
            
            var template = document.querySelector('.requestList ul template');
            var clone = document.importNode(template.content, true);
            
            clone.querySelector('li').querySelector('.details .name').textContent = items[i].title;
            clone.querySelector('li').querySelector('.details .user').textContent = items[i].userName;
            clone.querySelector('li').querySelector('.details .price').textContent = items[i].price + "$";
            clone.querySelector('li').querySelector('.category p').textContent = getCategory(items[i].categoryShort)["fullName"];
            clone.querySelector('li').setAttribute('id', items[i].id);
            clone.querySelector('li').querySelector('.requestOfferIcon').setAttribute('id', items[i].isOffer);
        
            if(items[i].isOffer == 1){
                clone.querySelector('li').querySelector('.container .topLine .requestOfferIcon #requestText').textContent = "Offer";
                clone.querySelector('li').querySelector('.container').style.background = "url("+items[i].thumbnail+")";
            }else{  
                clone.querySelector('li').querySelector('.container .topLine .requestOfferIcon #requestText').textContent = "Request";
            }

            myList.appendChild(clone);
        }catch(err){
            console.error("Couldnt render item:"+i + "\r\n Error:" + err);
        }
    }
}
function clearList(){
    const myList = document.querySelector('.requestList ul');
    const childNodes = Array.from(myList.children);
    const elementsToRemove = childNodes.filter(node => node.tagName !== 'TEMPLATE');

    elementsToRemove.forEach(element => {
        myList.removeChild(element);
    });
}
function generateList(items){
    clearList();
    renderList(items);
}
function filterItems(offers, requests){
    return shuffle(filterList(requests, "requests").concat(filterList(offers, "offers")));
}

function filterList(items, type){
    var filteredItems = [];

    var filterString = document.getElementById("searchText").value;

    filterString = filterString.replace(/\s/g,'').toLowerCase();

    var minPrice = parseInt(document.querySelector(".priceMinInput").value);
    var maxPrice = parseInt(document.querySelector(".priceMaxInput").value);

    var typesSelected = getSelectedTypes();
    var showOffers = false;
    var showRequests = false;
    var selectedCategories = getSelectedCategories();
    if(typesSelected.includes("tR")) showRequests = true;
    if(typesSelected.includes("tO")) showOffers = true;



    if(isNaN(minPrice)){
        minPrice = 0;
    }
    if(isNaN(maxPrice) || maxPrice < minPrice){
        maxPrice = 100000;
    }

    items.forEach(item =>{
        var name = new String(item.title);
        var user = new String(item.userName);
        var price = item.price;
        var category = item.categoryShort;

        var isSelectedCategory = false;
            selectedCategories.forEach(crntCategory =>{

            if(crntCategory.replace(/\s/g,'').toLowerCase() == category.replace(/\s/g,'').toLowerCase()){
                isSelectedCategory = true;
            }
        });
        
        if((showOffers && type == "offers") || (showRequests && type == "requests")){
            if(user.replace(/\s/g,'').toLowerCase().includes(filterString) || name.replace(/\s/g,'').toLowerCase().includes(filterString)){
                if (minPrice <= price){
                    if(price <= maxPrice){
                        if(isSelectedCategory){
                            filteredItems.push(item);
                        }
                    }
                }
            }
        }
    });

    return filteredItems
}

function checkEnter(event) {
    if (event.key === "Enter") {
        generateList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
        if(document.getElementById("searchText").value != ""){
            currentPage = 1;
            generateList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
            pageText.textContent = currentPage;
        }
    }
}

function checkFilterUpdate(){
    currentPage = 1;
    pageText.textContent = currentPage;
    updatePage();
}

function checkEmpty(){
    if(document.getElementById("searchText").value == ""){
        currentPage = 1;
        generateList(filterItems(getAllOffersFromDb(), getAllRequestsFromDb()));
        pageText.textContent = currentPage;
    }
}

function switchFilterSection(){
    filterSection = document.querySelector(".filterSection");
    children = document.querySelectorAll(".filterSection *");
    baseWidth = [];

    children.forEach(child=>{
        baseWidth.push(child.style.width);
    });

    if(filterSection.style.width == "0vw"){
        filterSection.style.width = "15vw";
        filterSection.style.left = "2vw";
        children.forEach(element =>{
            element.style.opacity = "1";
        });
    }else{
        filterSection.style.width = "0vw";
        filterSection.style.left = "-10vw";
        children.forEach(element =>{
            element.style.opacity = "1";
        });
    }
}

function getSelectedCategories(){
    var checkBoxes = document.querySelectorAll(".categoryCheckBox input");

    var allSelected = false;

    var returnCBs = [];

    checkBoxes.forEach(cb =>{
        if(cb.checked){
            returnCBs.push(cb.name);
        }
    });
    
    if(returnCBs.length < 1){
        checkBoxes.forEach(element => {returnCBs.push(element.name)})
    }

    return returnCBs;
}
function getSelectedTypes(){
    var checkBoxes = document.querySelectorAll(".typeCheckBox input");

    var returnCBs = []

    checkBoxes.forEach(cb =>{
        if(cb.checked){
            returnCBs.push(cb.name);
        }
    })

    return returnCBs;
}   

function getCategory(string){
    if(string[0] == "c"){
        return toJSON(getAllItemsFromTable("categories", " WHERE short='"+string+"'").responseText)[0]
    }else{
        return toJSON(getAllItemsFromTable("categories", " WHERE fullName='"+string+"'").responseText)
    }
}

function initCategoryList(){
    var categories = toJSON(getAllItemsFromTable("categories").responseText);
    var categoryList = document.querySelector("#categoryList");

    var template = categoryList.querySelector("template");

    categories.forEach(element =>{
        var clone = document.importNode(template.content, true);
        
        clone.querySelector("li.categoryCheckBox p").textContent = element["fullName"];
        clone.querySelector("li.categoryCheckBox input").name = element["short"]

        categoryList.appendChild(clone  )
    })
}

function createOffer(title, user, price, categoryShort, description) {
    createItem("offers", title, user, price, categoryShort, description)
}
function createRequest(title, user, price, categoryShort, description){
    createItem("requests", title, user, price, categoryShort, description)
}
function createItem(table, title, user, price, categoryShort, description){
    if(table == "offers"){
        query("INSERT INTO `offers` (`title`, `userName`, `categoryShort`, `price`, `description`) VALUES ('"+title+"', '"+user+"', '"+categoryShort+"', '"+price+"', '"+description+"')")
    }else if(table == "requests"){
        query("INSERT INTO `requests` (`title`, `userName`, `categoryShort`, `price`, `description`) VALUES ('"+title+"', '"+user+"', '"+categoryShort+"', '"+price+"', '"+description+"')")
    }
}

function getAllOffersFromDb() {
    return getAllItems("offers");
}
function getAllRequestsFromDb(){
    return getAllItems("requests");;
}

function getAllItems(table){
    xhr = getAllItemsFromTable(table);

    if (xhr.readyState === 4 && xhr.status === 200) {
        try{
            return JSON.parse(xhr.responseText);
        }catch(err){
            return[];
        }
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function openItem(event){
    var parent = event.target.parentNode
    console.log(parent)
    while(parent.tagName != "LI")
        parent = parent.parentNode
    console.log(parent)

    var originUrl = window.origin;
    var fullUrl = originUrl + "/connectMe/item.html" + "?id=" + parent.id + "&type=" + parent.querySelector(".requestOfferIcon").id;

    window.location.href = fullUrl;
}

if(getUser().id){}  
else{
    window.location.href = "logIn.html?from=explore"
}

try{
initCategoryList();
updatePage();
}catch{}
