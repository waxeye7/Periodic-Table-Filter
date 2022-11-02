let filtered_status = false;

let ElementsDatabase;

let Filter_By_Name_Input = document.getElementById("name-filter");

let Sort_By_Gas = document.getElementById("sort-by-gas");
let Sort_By_Solid = document.getElementById("sort-by-solid");
let Sort_By_Liquid = document.getElementById("sort-by-liquid");



async function fetch_element_data() {
    const response = await fetch("./data/Elements.JSON");
    ElementsDatabase = await response.json();
    MaterialiseElement(ElementsDatabase);
}

function ResetParent() {
    let parent = document.getElementById("parent");
    parent.remove();
    parent = document.createElement('div');
    parent.id = "parent";
    parent.classList.add("flex", "flexwrap")
    document.body.appendChild(parent);
}

function MaterialiseElement(ElementsDatabase) {
    for(let element of ElementsDatabase) {

        let parent = document.getElementById("parent");

        let Card_Div = document.createElement('div');
        Card_Div.classList.add("Card-CSS", "flex", "flex-center");
    
        parent.appendChild(Card_Div);
    
        let Element_Name = document.createElement('p');
        Element_Name.innerHTML = element.name;
    
        Card_Div.appendChild(Element_Name);
    }
}

fetch_element_data();

// sort by gas phase
Sort_By_Gas.onclick = sort_by_gas_function;
function sort_by_gas_function() {

    Sort_By_Liquid.classList.remove("highlight")
    Sort_By_Solid.classList.remove("highlight")

    if(filtered_status == "Gas")  {
        ResetParent();
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Gas.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Gas);
        return;
    }

    let Gas_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Gas";
    });
    ResetParent();
    MaterialiseElement(Gas_Elements)
    filtered_status = "Gas"
    Sort_By_Gas.classList.add("highlight")

    checkInput(Gas_Elements, Sort_By_Gas);
}

// sort by solid phase
Sort_By_Solid.onclick = sort_by_solid_function;
function sort_by_solid_function() {

    Sort_By_Liquid.classList.remove("highlight")
    Sort_By_Gas.classList.remove("highlight")

    if(filtered_status == "Solid")  {
        ResetParent();
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Solid.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Solid);
        return;
    }

    let Solid_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Solid";
    });
    ResetParent();
    MaterialiseElement(Solid_Elements)
    filtered_status = "Solid"
    Sort_By_Solid.classList.add("highlight")

    checkInput(Solid_Elements, Sort_By_Solid);
}


Sort_By_Liquid.onclick = sort_by_liquid_function;
function sort_by_liquid_function() {

    Sort_By_Gas.classList.remove("highlight")
    Sort_By_Solid.classList.remove("highlight")

    if(filtered_status == "Liquid")  {
        ResetParent();
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Liquid.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Liquid);
        return;
    }

    let Liquid_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Liquid";
    });
    ResetParent();
    MaterialiseElement(Liquid_Elements)
    filtered_status = "Liquid"
    Sort_By_Liquid.classList.add("highlight")

    checkInput(Liquid_Elements, Sort_By_Liquid);
}

Filter_By_Name_Input.oninput = sort_by_name_function;
function sort_by_name_function(Database) {
    if(Filter_By_Name_Input.value.length == 0) {
        ResetParent();
        MaterialiseElement(ElementsDatabase);
    }
    let Name_Filtered_Elements;
    if(Database.length) {
        Name_Filtered_Elements = Database.filter((element) => {
            let ElementName = element.name.toLowerCase();
            let InputtedValue = Filter_By_Name_Input.value.toLowerCase();
            return ElementName.includes(InputtedValue);
        });
    }
    else {
        if(filtered_status) {
            let LiquidFilteredDatabase = ElementsDatabase.filter((element) => {
                return element.phase == filtered_status;
            });
            Name_Filtered_Elements = LiquidFilteredDatabase.filter((element) => {
                let ElementName = element.name.toLowerCase();
                let InputtedValue = Filter_By_Name_Input.value.toLowerCase();
                return ElementName.includes(InputtedValue);
            });
        }
        else {
            Name_Filtered_Elements = ElementsDatabase.filter((element) => {
                let ElementName = element.name.toLowerCase();
                let InputtedValue = Filter_By_Name_Input.value.toLowerCase();
                return ElementName.includes(InputtedValue);
            });
        }
    }

    ResetParent();
    MaterialiseElement(Name_Filtered_Elements);
    checkResultEmpty(Name_Filtered_Elements)
}

function checkInput(FilteredArray, type=false) {
    Sort_By_Liquid.classList.remove("highlight")
    Sort_By_Gas.classList.remove("highlight")
    Sort_By_Solid.classList.remove("highlight")

    if(type && filtered_status != false) {
        type.classList.add("highlight");
    }

    if(Filter_By_Name_Input.value.length > 0) {
        sort_by_name_function(FilteredArray)
    }
}

function checkResultEmpty(DatabaseArray) {
    let empty_database = document.getElementById("Empty-Database");
    if(DatabaseArray.length == 0) {
        empty_database.classList.remove("hidden")
    }
    else {
        empty_database.classList.add("hidden")
    }
}