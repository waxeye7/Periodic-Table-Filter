async function fetch_element_data() {
    const response = await fetch("./Elements.JSON");
    let ElementsDatabase = await response.json();
    console.log(ElementsDatabase.length)
    for(let element of ElementsDatabase) {
        MaterialiseElement(element);
    }
}

function MaterialiseElement(element) {
    let parent = document.getElementById("parent");

    let Card_Div = document.createElement('div');
    Card_Div.classList.add("Card-CSS", "flex", "flex-center");

    parent.appendChild(Card_Div);

    let Element_Name = document.createElement('p');
    Element_Name.innerHTML = element.name;

    Card_Div.appendChild(Element_Name);
}

fetch_element_data();
