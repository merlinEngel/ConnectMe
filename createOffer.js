function initCategoryList(){
    categories = toJSON(getAllItemsFromTable("categories").responseText);

    optionsList = document.querySelector(".section2 #categoryDropdown");
    categories.forEach(categorie =>{
        option = document.createElement("option");
        option.text = categorie["fullName"];
        optionsList.add(option)
    });
}

initCategoryList();
