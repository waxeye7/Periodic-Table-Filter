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
    document.body.appendChild(parent);
}

function MaterialiseElement(ElementsDatabase) {
    ResetParent();
    for(let element of ElementsDatabase) {
        let parent = document.getElementById("parent");
        let Card_Div = document.createElement('div');
        Card_Div.classList.add("Card-CSS", "flex");
        child = document.createElement('div');
        child.id = "child";
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

        let Element_Name = document.createElement('p');
        Element_Name.classList.add("Name-Style");
        Element_Name.innerHTML = element.name;
        Flex_Column_Div.appendChild(Element_Name);
        // let info_list = ["number", "appearance", "atomic_mass"];
        let info_list = ["summary"];
        for(let property of Object.keys(element)) {
            if(info_list.includes(property)) {
                let Element_Info = document.createElement('p');
                if(element[property]) {
                    // property + ": " + 
                    Element_Info.innerHTML += element[property];
                }
                else {
                    Element_Info.innerHTML += "[ERR_" + property.toUpperCase() + "_NOT_FOUND]";
                }
                Element_Info.classList.add("summary-style")
                Flex_Column_Div.appendChild(Element_Info);
            }
        }

        let Extra_Info = document.createElement('div');
        Extra_Info.classList.add("extra-info", "hide");


        let Element_Info = document.createElement('p');
        let property = "cpk_hex";
        Element_Info.style.backgroundColor = "#" + element.cpk_hex;
        // Element_Info.style.backgroundColor = Element_Info.style.backgroundColor.replace(")",",0.4)")
        let Symbol = document.createElement('div');
        Symbol.innerHTML = element.symbol;
        Symbol.style.backgroundColor = "#" + element.cpk_hex;
        Symbol.classList.add("symbol-style")
        Element_Info.appendChild(Symbol)
        // Element_Info.innerHTML = element.symbol;
        Element_Info.classList.add("cpk-hex");
        // let splitProperty = property.split("_").join(" ");
        // Element_Info.innerHTML += splitProperty;
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
                    // property + ": " + 
                    
                    let splitProperty = property.split("_").join(" ");
                    let capitaliseSplitProperty = splitProperty.charAt(0).toUpperCase() + splitProperty.slice(1);

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



        child.appendChild(Extra_Info);


        Card_Div.onclick = function() {
            let allCards = document.getElementsByClassName("extra-info");

            for(let card of allCards) 
                if(card.parentNode != this.parentNode)
                    card.classList.add("hide");
                         
            Extra_Info.classList.toggle("hide");
            Extra_Info.onclick = function() {
                Extra_Info.classList.toggle("hide");
            }
            // this.style.height = (this.offsetHeight + 20).toString() + "px";
        }
    }
    
}

fetch_element_data();

// sort by gas phase
Sort_By_Gas.onclick = sort_by_gas_function;
function sort_by_gas_function() {

    Sort_By_Liquid.classList.remove("highlight")
    Sort_By_Solid.classList.remove("highlight")

    if(filtered_status == "Gas")  {
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Gas.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Gas);
        return;
    }

    let Gas_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Gas";
    });
    MaterialiseElement(Gas_Elements)
    filtered_status = "Gas"
    Sort_By_Gas.classList.add("highlight")

    checkInput(Gas_Elements, Sort_By_Gas);
}

Sort_By_Solid.onclick = sort_by_solid_function;
function sort_by_solid_function() {

    Sort_By_Liquid.classList.remove("highlight")
    Sort_By_Gas.classList.remove("highlight")

    if(filtered_status == "Solid")  {
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Solid.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Solid);
        return;
    }

    let Solid_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Solid";
    });
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
        MaterialiseElement(ElementsDatabase);
        filtered_status = false;
        Sort_By_Liquid.classList.remove("highlight")
        checkInput(ElementsDatabase, Sort_By_Liquid);
        return;
    }

    let Liquid_Elements = ElementsDatabase.filter((element) => {
        return element.phase == "Liquid";
    });
    MaterialiseElement(Liquid_Elements)
    filtered_status = "Liquid"
    Sort_By_Liquid.classList.add("highlight")

    checkInput(Liquid_Elements, Sort_By_Liquid);
}

Filter_By_Name_Input.oninput = sort_by_name_function;
function sort_by_name_function(Database) {
    if(Filter_By_Name_Input.value.length == 0) {
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

    if(DatabaseArray.length == 0) {
        DatabaseArray = [
            {
                appearance: "silvery white",
                atomic_mass: 150.362,
                boil: 2173,
                category: "lanthanide",
                density: 7.52,
                discovered_by: "Lecoq de Boisbaudran",
                melt: 1345,
                molar_heat: 29.54,
                named_by: null,
                number: 62,
                period: 6,
                source: "https://en.wikipedia.org/wiki/Samarium",
                bohr_model_image:"https://storage.googleapis.com/search-ar-edu/periodic-table/element_062_samarium/element_062_samarium_srp_th.png",
                bohr_model_3d:"https://storage.googleapis.com/search-ar-edu/periodic-table/element_062_samarium/element_062_samarium.glb",
                spectral_img: null,
                summary: "Samarium is a chemical element with symbol Sm and atomic number 62. It is a moderately hard silvery metal that readily oxidizes in air. Being a typical member of the lanthanide series, samarium usually assumes the oxidation state +3.",
                symbol: "Sm",
                xpos: 8,
                ypos: 9,
                shells: [
                    2,
                    8,
                    18,
                    24,
                    8,
                    2
                ],
                electron_configuration: "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f6",
                electron_configuration_semantic: "[Xe] 4f6 6s2",
                electron_affinity: 15.63,
                electronegativity_pauling: 1.17,
                ionization_energies: [
                    544.5,
                    1070,
                    2260,
                    3990
                ],
                name: "Element Keeper",
                phase: "Solid",
                image:{
                    title: "Photomontage of what promethium metal might look like (it is too radioactive and real images are not available)",
                    url: "./images/buffy.webp",
                    attribution: "Unknown authorUnknown author, CC BY 3.0 <https://creativecommons.org/licenses/by/3.0>, via Wikimedia Commons, source: https://images-of-elements.com/promethium.php"
                }
            }
        ]
        MaterialiseElement(DatabaseArray);
    }
}
