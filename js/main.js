import productDatabase, {bulkcreate, getData, createElement} from './Module.js';

let techDatabase = productDatabase("productDatabase", {
    products: `++id, name, seller, price`
});

const userid = document.getElementById("userid");
const productname = document.getElementById("productname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");
const createButtton = document.getElementById("btn-create");
const readButton = document.getElementById("btn-read");
const updateButton = document.getElementById("btn-update");
const deleteAllButton = document.getElementById("btn-delete");


createButtton.onclick = () => {
    let flag = bulkcreate(techDatabase.products, {
        name: productname.value,
        seller: seller.value,
        price: price.value,
    })


    productname.value = seller.value = price.value = "";
    getData(techDatabase.products, (data) => {
        userid.value = data.id + 1 || 1;

    });
    flag ? displayMessage("DATA INSERTED","#00ad43"):"";
}


readButton.onclick = table;

updateButton.onclick = () => {
    const id = parseInt(userid.value || 0);
    if (id) {

        techDatabase.products.update(id, {
            name: productname.value,
            seller: seller.value,
            price: price.value,
        }).then((updated) => {
            !!updated ? displayMessage("DATA UPDATED","black"):"";
            productname.value = seller.value = price.value = "";

        })
    }
}

deleteAllButton.onclick = () => {
    techDatabase.delete();
    techDatabase = productDatabase("Productdb", {
        products: `++id, name, seller, price`
    });
    techDatabase.open();
    table();
    textID(userid);
    displayMessage("DATA DELETED");
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
                        td.textContent = data.price === data[value] ? `$${data[value]}` : data[value];
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
            displayMessage("DATABASE EMPTY","#ad000f")
        }
    })

}

function editButton(event) {
    let id = parseInt(event.target.dataset.id);
    techDatabase.products.get(id, data => {
        userid.value = data.id || 0;
        productname.value = data.name || "";
        seller.value = data.seller || "";
        price.value = data.price || "";
    })
}

function trashButton(event) {
    let id = parseInt(event.target.dataset.id);
    techDatabase.products.delete(id);
    table();
}


function displayMessage(alertText, alertColor) {
    document.getElementById("bar-alert").style.color = alertColor;
    document.getElementById("bar-alert").textContent = alertText;
    $("#bar-alert").addClass('show')
        setTimeout(() => {
            $("#bar-alert").removeClass('show')

        }, 3000);
}
