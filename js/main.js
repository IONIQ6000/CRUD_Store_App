import productdb, {bulkcreate, getData, createElement} from './Module.js';

let techDatabase = productdb("Productdb", {
    products: `++id, name, seller, price`
});

// input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// button function
const createButtton = document.getElementById("btn-create");
const readButton = document.getElementById("btn-read");
const updateButton = document.getElementById("btn-update");
const deleteAllButton = document.getElementById("btn-delete");

const notfound = document.getElementById("notfound");

// insert value using create button

createButtton.onclick = (event) => {
    let flag = bulkcreate(techDatabase.products, {
        name: proname.value,
        seller: seller.value,
        price: price.value,
    })


    proname.value = seller.value = price.value = "";
    getData(techDatabase.products, (data) => {
        userid.value = data.id + 1 || 1;

    });

    let insertMessage = document.querySelector(".insertmessage");

    getMessage(flag, insertMessage);
}


readButton.onclick = table;

updateButton.onclick = () => {
    const id = parseInt(userid.value || 0);
    if (id) {

        techDatabase.products.update(id, {
            name: proname.value,
            seller: seller.value,
            price: price.value,
        }).then((updated) => {
            let get = updated ? `data Updated` : `Couldn't update data`;
            console.log(get);
        })
    }
}

deleteAllButton.onclick = () => {
    techDatabase.delete();
    techDatabase = productdb("Productdb", {
        products: `++id, name, seller, price`
    });
    techDatabase.open();
    table();
}

window.onload = () => {
    textID(userid);
}

function textID(textboxid) {
    getData(techDatabase.products, data => {
        textboxid.value = data.id + 1 || 1;
    })
}

function table() {
    const tableBody = document.getElementById("tbody");

    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }

    getData(techDatabase.products, (data) => {
        if (data) {
            createElement("tr", tableBody, tr => {

                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
                    })
                }
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-edit btnedit"
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = editButton;
                    })
                })
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-trash-alt btndelete"
                        i.setAttribute(`data-id`, data.id);
                        i.onclick = trashButton;
                    })
                })
            })
        } else {
            notfound.textContent = "DATABASE EMPTY"
        }
    })

}

function editButton(event) {
    let id = parseInt(event.target.dataset.id);
    techDatabase.products.get(id, data => {
        userid.value = data.id || 0;
        proname.value = data.name || "";
        seller.value = data.seller || "";
        price.value = data.price || "";
    })
}

function trashButton(event) {
    let id = parseInt(event.target.dataset.id);
    techDatabase.products.delete(id);
    table();
}

function getMessage(flag, element) {
    if (flag) {
        element.className += "movedown";

        setTimeout(() => {
            element.classList.forEach(classname => {
                classname == "movedown" ? undefined : element.classList.remove("movedown");
            });
        }, 4000);
    }
}