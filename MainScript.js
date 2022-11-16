let ElementsDatabase;

let Container = document.getElementById("over-filter-red-border");
let Not_Found = document.getElementById("not-found");
// let Not_String = document.getElementById("not-string");

let TotalElements = [];
let PhaseFilteredElements;
let NameFilteredElements;


let Sort_By_Gas = document.getElementById("sort-by-gas");
let Sort_By_Solid = document.getElementById("sort-by-solid");
let Sort_By_Liquid = document.getElementById("sort-by-liquid");

Sort_By_Gas.onclick = function() {
    Sort_By_Gas.classList.toggle("highlight");
    Sort_By_Solid.classList.remove("highlight");
    Sort_By_Liquid.classList.remove("highlight");
    FilterManager();
}

Sort_By_Solid.onclick = function() {
    Sort_By_Gas.classList.remove("highlight");
    Sort_By_Solid.classList.toggle("highlight");
    Sort_By_Liquid.classList.remove("highlight");
    FilterManager();
}
Sort_By_Liquid.onclick = function() {
    Sort_By_Gas.classList.remove("highlight");
    Sort_By_Solid.classList.remove("highlight");
    Sort_By_Liquid.classList.toggle("highlight");
    FilterManager();
}


let Filter_By_Name_Input = document.getElementById("name-filter");

Filter_By_Name_Input.oninput = FilterManager;

let clear_button = document.getElementById("clear");
clear_button.onclick = function() {
    if(Filter_By_Name_Input.value.length > 0) {
        Filter_By_Name_Input.value = "";
        FilterManager();
    }
}

fetch_element_data();


async function fetch_element_data() {
    const response = await fetch("./data/Elements.JSON");
    ElementsDatabase = await response.json();
    MaterialiseElement(ElementsDatabase);
}

function FilterPhase(phase) { 
    for(let i=0; i<ElementsDatabase.length; i++) {
        if(ElementsDatabase[i].phase == phase) {
            PhaseFilteredElements.push(ElementsDatabase[i].name)
        }
    }
}

function FilterName(name) {
    if(name.length == 0) {
        NameFilteredElements = TotalElements;
        return;
    }
    let InputValueLower = name.toLowerCase();
    for(let i=0; i<ElementsDatabase.length; i++) {
        let ElementNameLower = ElementsDatabase[i].name.toLowerCase();

        if(ElementNameLower.includes(InputValueLower)) {
            NameFilteredElements.push(ElementsDatabase[i].name)
        }
    }
}


function FilterManager() {
    Container.classList.remove("outline-light-red");
    Not_Found.classList.add("hidden");
    // Not_String.classList.add("hidden")

    PhaseFilteredElements = [];
    NameFilteredElements = [];

    let FinalFilteredList = [];

    let Sort_By_Gas = document.getElementById("sort-by-gas");
    let Sort_By_Solid = document.getElementById("sort-by-solid");
    let Sort_By_Liquid = document.getElementById("sort-by-liquid");

    if(Sort_By_Gas.classList.contains("highlight")) {
        FilterPhase("Gas");
    }
    else if(Sort_By_Solid.classList.contains("highlight")) {
        FilterPhase("Solid");
    }
    else if(Sort_By_Liquid.classList.contains("highlight")) {
        FilterPhase("Liquid");
    }
    else {
        PhaseFilteredElements = TotalElements;
    }

    FilterName(Filter_By_Name_Input.value);


    for(let i=0; i<TotalElements.length; i++) {
        if(PhaseFilteredElements.includes(TotalElements[i]) && NameFilteredElements.includes(TotalElements[i])) {
            FinalFilteredList.push(TotalElements[i]);
        }
    }

    if(FinalFilteredList.length == 0) {
        FinalFilteredList = TotalElements;
        Container.classList.add("outline-light-red");
        // if (isNaN(Filter_By_Name_Input)) 
        // {
        //     Not_String.classList.remove("hidden");
        // }
        // else {
        Not_Found.classList.remove("hidden");
        // }
    }


    for(let i=0; i<TotalElements.length; i++) {

        let child = document.getElementById(TotalElements[i]);

        if(FinalFilteredList.includes(TotalElements[i])) {
            child.classList.remove("hidden");
        }
        else {
            child.classList.add("hidden");
        }
    }

    View_Manager();
}


function View_Manager() {
    let Thumbnail_Button = document.getElementById("thumbnail");
    let List_Button = document.getElementById("list");
    if(Thumbnail_Button.classList.contains("highlight")) {
        Thumbnail_View();
    }
    else if(List_Button.classList.contains("highlight")) {
        List_View();
    }
    else {
        Large_View();
    }
}

let Large_Button = document.getElementById("large");
let Thumbnail_Button = document.getElementById("thumbnail");
let List_Button = document.getElementById("list");

Large_Button.classList.add("highlight");

Large_Button.onclick = function() {
    Large_Button.classList.add("highlight");
    Thumbnail_Button.classList.remove("highlight");
    List_Button.classList.remove("highlight");
    View_Manager();
}
Thumbnail_Button.onclick = function() {
    Thumbnail_Button.classList.add("highlight");
    Large_Button.classList.remove("highlight");
    List_Button.classList.remove("highlight");
    View_Manager();
}
List_Button.onclick = function() {
    List_Button.classList.add("highlight");
    Large_Button.classList.remove("highlight");
    Thumbnail_Button.classList.remove("highlight");
    View_Manager();
}


function Large_View() {
    let bohr_image_class_element_list = document.getElementsByClassName("bohr-img-wrapper");
    let cpk_hex_element_list = document.getElementsByClassName("cpk-hex");
    let image_wrapper_element_list = document.getElementsByClassName("Img-Wrapper");
    let extra_info_element_list = document.getElementsByClassName("extra-info");
    let absolute_symbol_element_list = document.getElementsByClassName("absolute-symbol");
    let summary_element_list = document.getElementsByClassName("summary-style");
    let element_name_div_element_list = document.getElementsByClassName("Name-Style");
    let child_element_list = document.getElementsByClassName("child");

    let ElementsToHide = [bohr_image_class_element_list, cpk_hex_element_list,
                        image_wrapper_element_list, extra_info_element_list,
                        absolute_symbol_element_list, summary_element_list,
                        element_name_div_element_list, child_element_list]
    for(let i=0; i<ElementsToHide.length; i++) {
        for(let o=0; o<ElementsToHide[i].length; o++) {
            if(ElementsToHide[i] == extra_info_element_list) {
                ElementsToHide[i][o].style.height = "272px";
                ElementsToHide[i][o].classList.remove("hidden");
            }

            else if(ElementsToHide[i] == element_name_div_element_list) {
                ElementsToHide[i][o].style.fontSize = "clamp(24px, 3.4vw, 30px)";
                ElementsToHide[i][o].style.margin = "0 0 8px 0";
            }

            else if(ElementsToHide[i] == child_element_list) {
                ElementsToHide[i][o].classList.add("large")
                ElementsToHide[i][o].classList.remove("list", "thumbnail")
                ElementsToHide[i][o].style.marginBottom = "24px";
                ElementsToHide[i][o].classList.remove("child-thumbnail-max-width", "grid-content");
            }

            else if(ElementsToHide[i] == image_wrapper_element_list) {
                ElementsToHide[i][o].classList.remove("Img-Wrapper-no-outline");
                ElementsToHide[i][o].classList.remove("hidden");
            }

            else {
                ElementsToHide[i][o].classList.remove("hidden");
            }
        }
    }

    let div_for_list_element_list = document.getElementsByClassName("flex-column-div");
    for(let i=0; i<div_for_list_element_list.length; i++) {
        div_for_list_element_list[i].classList.add("column");
    }

    let List_view_symbol_element_list = document.getElementsByClassName("List-view-symbol");
    for(let i=0; i<List_view_symbol_element_list.length; i++) {
        List_view_symbol_element_list[i].classList.add("hidden");
    }

    let List_view_number_element_list = document.getElementsByClassName("List-view-number");
    for(let i=0; i<List_view_number_element_list.length; i++) {
        List_view_number_element_list[i].classList.add("hidden");
    }
    let card_css_element_list = document.getElementsByClassName("Card-CSS");
    for(let i=0; i<card_css_element_list.length; i++) {
        card_css_element_list[i].classList.remove("column");
    }

    let List_view_category_element_list = document.getElementsByClassName("List-view-category");
    for(let i=0; i<List_view_category_element_list.length; i++) {
        List_view_category_element_list[i].classList.add("hidden");
    }

    let List_view_atomic_mass_element_list = document.getElementsByClassName("List-view-atomic-mass");
    for(let i=0; i<List_view_atomic_mass_element_list.length; i++) {
        List_view_atomic_mass_element_list[i].classList.add("hidden");
    }

    let parent = document.getElementById("parent");
    parent.classList.remove("flex", "flexwrap", "grid-container")
}

function Thumbnail_View() {
    let bohr_image_class_element_list = document.getElementsByClassName("bohr-img-wrapper");
    let cpk_hex_element_list = document.getElementsByClassName("cpk-hex");
    let image_wrapper_element_list = document.getElementsByClassName("Img-Wrapper");
    let extra_info_element_list = document.getElementsByClassName("extra-info");
    let absolute_symbol_element_list = document.getElementsByClassName("absolute-symbol");
    let summary_element_list = document.getElementsByClassName("summary-style");
    let element_name_div_element_list = document.getElementsByClassName("Name-Style");
    let child_element_list = document.getElementsByClassName("child");

    let ElementsToHide = [bohr_image_class_element_list, cpk_hex_element_list,
                        image_wrapper_element_list, extra_info_element_list,
                        absolute_symbol_element_list, summary_element_list,
                        element_name_div_element_list, child_element_list]
    for(let i=0; i<ElementsToHide.length; i++) {
        for(let o=0; o<ElementsToHide[i].length; o++) {
            if(ElementsToHide[i] == extra_info_element_list) {
                ElementsToHide[i][o].style.height = "0px";
                ElementsToHide[i][o].classList.add("hidden");
            }


            else if(ElementsToHide[i] == bohr_image_class_element_list) {
                ElementsToHide[i][o].classList.add("hidden");
            }


            else if(ElementsToHide[i] == summary_element_list) {
                ElementsToHide[i][o].classList.add("hidden");
            }

            else if(ElementsToHide[i] == element_name_div_element_list) {
                // ElementsToHide[i][o].style.fontSize = "clamp(24px, 3.4vw, 30px)";
                ElementsToHide[i][o].style.margin = "0 0 8px 0";
            }

            else if(ElementsToHide[i] == child_element_list) {
                ElementsToHide[i][o].classList.add("thumbnail")
                ElementsToHide[i][o].classList.remove("list", "large")
                ElementsToHide[i][o].style.marginBottom = "24px";
                ElementsToHide[i][o].classList.add("child-thumbnail-max-width", "grid-content");
            }

            else if(ElementsToHide[i] == image_wrapper_element_list) {
                ElementsToHide[i][o].classList.add("Img-Wrapper-no-outline");
                ElementsToHide[i][o].classList.remove("hidden");
            }


            else {
                ElementsToHide[i][o].classList.remove("hidden");
            }
        }
    }

    let div_for_list_element_list = document.getElementsByClassName("flex-column-div");
    for(let i=0; i<div_for_list_element_list.length; i++) {
        div_for_list_element_list[i].classList.add("column");
    }

    let List_view_symbol_element_list = document.getElementsByClassName("List-view-symbol");
    for(let i=0; i<List_view_symbol_element_list.length; i++) {
        List_view_symbol_element_list[i].classList.add("hidden");
    }

    let List_view_number_element_list = document.getElementsByClassName("List-view-number");
    for(let i=0; i<List_view_number_element_list.length; i++) {
        List_view_number_element_list[i].classList.add("hidden");
    }
    let card_css_element_list = document.getElementsByClassName("Card-CSS");
    for(let i=0; i<card_css_element_list.length; i++) {
        card_css_element_list[i].classList.add("column");
    }

    let List_view_category_element_list = document.getElementsByClassName("List-view-category");
    for(let i=0; i<List_view_category_element_list.length; i++) {
        List_view_category_element_list[i].classList.add("hidden");
    }

    let List_view_atomic_mass_element_list = document.getElementsByClassName("List-view-atomic-mass");
    for(let i=0; i<List_view_atomic_mass_element_list.length; i++) {
        List_view_atomic_mass_element_list[i].classList.add("hidden");
    }

    let parent = document.getElementById("parent");
    parent.classList.add("grid-container");
}

function List_View() {
    let bohr_image_class_element_list = document.getElementsByClassName("bohr-img-wrapper");
    let cpk_hex_element_list = document.getElementsByClassName("cpk-hex");
    let image_wrapper_element_list = document.getElementsByClassName("Img-Wrapper");
    let extra_info_element_list = document.getElementsByClassName("extra-info");
    let absolute_symbol_element_list = document.getElementsByClassName("absolute-symbol");
    let summary_element_list = document.getElementsByClassName("summary-style");
    let element_name_div_element_list = document.getElementsByClassName("Name-Style");
    let child_element_list = document.getElementsByClassName("child");

    let ElementsToHide = [bohr_image_class_element_list, cpk_hex_element_list,
                        image_wrapper_element_list, extra_info_element_list,
                        absolute_symbol_element_list, summary_element_list,
                        element_name_div_element_list, child_element_list];

    for(let i=0; i<ElementsToHide.length; i++) {
        for(let o=0; o<ElementsToHide[i].length; o++) {
            if(ElementsToHide[i] == extra_info_element_list) {
                ElementsToHide[i][o].style.height = "0px";
                ElementsToHide[i][o].classList.add("hidden");
            }

            else if(ElementsToHide[i] == element_name_div_element_list) {
                ElementsToHide[i][o].style.fontSize = "clamp(20px, 3vw, 26px)";
                ElementsToHide[i][o].style.margin = "0px";
            }

            else if(ElementsToHide[i] == child_element_list) {
                ElementsToHide[i][o].classList.add("list")
                ElementsToHide[i][o].classList.remove("thumbnail", "large")
                ElementsToHide[i][o].style.marginBottom = "10px";
                ElementsToHide[i][o].classList.remove("child-thumbnail-max-width", "grid-content");
                
            }

            else if(ElementsToHide[i] == image_wrapper_element_list) {
                ElementsToHide[i][o].classList.remove("Img-Wrapper-no-outline");
                ElementsToHide[i][o].classList.add("hidden");
            }

            else {
                ElementsToHide[i][o].classList.add("hidden");
            }
        }
    }

    let div_for_list_element_list = document.getElementsByClassName("flex-column-div");
    for(let i=0; i<div_for_list_element_list.length; i++) {
        div_for_list_element_list[i].classList.remove("column");
    }

    let List_view_symbol_element_list = document.getElementsByClassName("List-view-symbol");
    for(let i=0; i<List_view_symbol_element_list.length; i++) {
        List_view_symbol_element_list[i].classList.remove("hidden");
    }

    let List_view_number_element_list = document.getElementsByClassName("List-view-number");
    for(let i=0; i<List_view_number_element_list.length; i++) {
        List_view_number_element_list[i].classList.remove("hidden");
    }
    let card_css_element_list = document.getElementsByClassName("Card-CSS");
    for(let i=0; i<card_css_element_list.length; i++) {
        card_css_element_list[i].classList.remove("column");
    }

    let List_view_category_element_list = document.getElementsByClassName("List-view-category");
    for(let i=0; i<List_view_category_element_list.length; i++) {
        List_view_category_element_list[i].classList.remove("hidden");
    }

    let List_view_atomic_mass_element_list = document.getElementsByClassName("List-view-atomic-mass");
    for(let i=0; i<List_view_atomic_mass_element_list.length; i++) {
        List_view_atomic_mass_element_list[i].classList.remove("hidden");
    }

    // let category_element_list = document.getElementsByClassName("category");
    // for(let i=0; i<category_element_list.length; i++) {
    //     category_element_list[i].classList.add("not-hidden");
    // }

    // let appearance_element_list = document.getElementsByClassName("appearance");
    // for(let i=0; i<appearance_element_list.length; i++) {
    //     appearance_element_list[i].classList.add("not-hidden");
    // }

    // let discovered_by_element_list = document.getElementsByClassName("discovered_by");
    // for(let i=0; i<discovered_by_element_list.length; i++) {
    //     discovered_by_element_list[i].classList.add("not-hidden");
    // }

    // let boil_element_list = document.getElementsByClassName("boil");
    // for(let i=0; i<boil_element_list.length; i++) {
    //     boil_element_list[i].classList.add("not-hidden");
    // }

    // let atomic_mass_element_list = document.getElementsByClassName("atomic_mass");
    // for(let i=0; i<atomic_mass_element_list.length; i++) {
    //     atomic_mass_element_list[i].classList.add("not-hidden");
    // }

    let parent = document.getElementById("parent");
    parent.classList.remove("flex", "flexwrap", "grid-container")
}




function MaterialiseElement(ElementsDatabase) {
    for(let element of ElementsDatabase) {

        TotalElements.push(element.name);
        
        let parent = document.getElementById("parent");
        let Card_Div = document.createElement('div');
        Card_Div.classList.add("Card-CSS", "flex");
        child = document.createElement('div');
        child.classList.add("child");
        child.id = element.name;
        parent.appendChild(child);

        child.appendChild(Card_Div);

        let Absolute_Symbol = document.createElement('div');
        Absolute_Symbol.classList.add("absolute-symbol")
        Absolute_Symbol.innerHTML = element.symbol;
        Card_Div.appendChild(Absolute_Symbol);

        let Img_Wrapper = document.createElement('div');
        Img_Wrapper.classList.add("Img-Wrapper");
        let Element_Image = document.createElement('img');
        Element_Image.src = element.image.url;
        Img_Wrapper.appendChild(Element_Image);

        Card_Div.appendChild(Img_Wrapper);

        let Flex_Column_Div = document.createElement('div');
        Flex_Column_Div.classList.add("flex", "column", "flex-column-div");
        Card_Div.appendChild(Flex_Column_Div);

        
        let Element_Number_For_List_View = document.createElement('p');
        Element_Number_For_List_View.classList.add("List-view-number", "hidden");
        Element_Number_For_List_View.innerHTML = element.number;
        Flex_Column_Div.appendChild(Element_Number_For_List_View);


        let Element_Name = document.createElement('p');
        Element_Name.classList.add("Name-Style");
        Element_Name.innerHTML = element.name;
        Flex_Column_Div.appendChild(Element_Name);
        let info_list = ["summary"];
        for(let property of Object.keys(element)) {
            if(info_list.includes(property)) {
                let Element_Info = document.createElement('p');
                if(element[property]) {
                    Element_Info.innerHTML += element[property];
                }
                else {
                    Element_Info.innerHTML += "[ERR_" + property.toUpperCase() + "_NOT_FOUND]";
                }
                Element_Info.classList.add("summary-style")
                Flex_Column_Div.appendChild(Element_Info);
            }
        }


        let Element_Symbol_For_List_View = document.createElement('p');
        Element_Symbol_For_List_View.classList.add("List-view-symbol", "hidden");
        Element_Symbol_For_List_View.innerHTML = "[" + element.symbol + "]";
        Flex_Column_Div.appendChild(Element_Symbol_For_List_View);


        let Element_Category_For_List_View = document.createElement('p');
        Element_Category_For_List_View.classList.add("List-view-category", "hidden");
        let capitaliseCategory = element.category.charAt(0).toUpperCase() + element.category.slice(1);
        Element_Category_For_List_View.innerHTML = capitaliseCategory;
        Flex_Column_Div.appendChild(Element_Category_For_List_View);

        let Element_Atomic_Mass_For_List_View = document.createElement('p');
        Element_Atomic_Mass_For_List_View.classList.add("List-view-atomic-mass", "hidden");
        if(element.atomic_mass.toString().includes(".")) {
            Element_Atomic_Mass_For_List_View.innerHTML = "Atomic Mass: " + element.atomic_mass.toFixed(3);;
        }
        else {
            Element_Atomic_Mass_For_List_View.innerHTML = "Atomic Mass: " + element.atomic_mass
        }
        Flex_Column_Div.appendChild(Element_Atomic_Mass_For_List_View);


        // let Element_Name = document.createElement('p');
        // Element_Name.classList.add("Name-Style");
        // Element_Name.innerHTML = element.name;
        // Flex_Column_Div.appendChild(Element_Name);
        // let info_list = ["summary"];
        // for(let property of Object.keys(element)) {
        //     if(info_list.includes(property)) {
        //         let Element_Info = document.createElement('p');
        //         if(element[property]) {
        //             Element_Info.innerHTML += element[property];
        //         }
        //         else {
        //             Element_Info.innerHTML += "[ERR_" + property.toUpperCase() + "_NOT_FOUND]";
        //         }
        //         Element_Info.classList.add("summary-style")
        //         Flex_Column_Div.appendChild(Element_Info);
        //     }
        // }

        let Extra_Info = document.createElement('div');
        Extra_Info.classList.add("extra-info", "hide");


        let Element_Info = document.createElement('p');
        let property = "cpk_hex";
        Element_Info.style.backgroundColor = "#" + element.cpk_hex;
        let Symbol = document.createElement('div');
        Symbol.innerHTML = element.symbol;
        Symbol.style.backgroundColor = "#" + element.cpk_hex;
        Symbol.classList.add("symbol-style")
        Element_Info.appendChild(Symbol)
        Element_Info.classList.add("cpk-hex");
        Extra_Info.appendChild(Element_Info);

        let Extra_Info_Div = document.createElement('div');
        Extra_Info_Div.classList.add("Extra-Info-Div");
        let extra_info_list = ["number", "category", "appearance", "discovered_by", "boil", "atomic_mass", "bohr_model_image",];
        for(property of extra_info_list) {

            if(property == "bohr_model_image") {
                if(element[property]) {
                    let bohr_wrapper = document.createElement('div');
                    bohr_wrapper.classList.add("bohr-img-wrapper", "very-small-margin");
                    let bohr_img = document.createElement('img');
                    bohr_img.src = element.bohr_model_image;
                    bohr_wrapper.appendChild(bohr_img);
                    Extra_Info_Div.appendChild(bohr_wrapper);
                }
            }

            else {
                let Element_Info = document.createElement('p');
                Element_Info.classList.add("extra-info-para", "four-px-padding");
                if(element[property] && element[property].length != 0) {
                    let splitProperty = property.split("_").join(" ");
                    let capitaliseSplitProperty = splitProperty.charAt(0).toUpperCase() + splitProperty.slice(1);

                    // classlist to track the property
                    Element_Info.classList.add(property)

                    let value = element[property];
                    if(typeof(value) == "string") {
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                    }
                    if(property == "boil") {
                        value += "&#8451;";
                        Element_Info.innerHTML += capitaliseSplitProperty + ": " + value;
                    }

                    else {
                        Element_Info.innerHTML += capitaliseSplitProperty + ": " + value;
                    }
                }
                else {
                    let splitProperty = property.split("_").join(" ");
                    let capitaliseSplitProperty = splitProperty.charAt(0).toUpperCase() + splitProperty.slice(1);
                    Element_Info.innerHTML += capitaliseSplitProperty + ": unknown";
                }
                Extra_Info_Div.appendChild(Element_Info);
                }
            }

        Extra_Info.appendChild(Extra_Info_Div);

        child.appendChild(Extra_Info)

        Card_Div.onclick = function() {
            let allCards = document.getElementsByClassName("extra-info");

            for(let card of allCards) 
                if(card.parentNode != this.parentNode)
                    card.classList.add("hide");
                         
            Extra_Info.classList.toggle("hide");
            Extra_Info.onclick = function() {
                Extra_Info.classList.toggle("hide");
            }
        }
    }
}