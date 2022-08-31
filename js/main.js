import productdb, {bulkcreate, getData} from './Module.js';

let techDatabase = productdb("Productdb", {
    products: `++id, name, seller, price`
});

// input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// button function
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");


// insert value using create button

btncreate.onclick = (event) => {
    let flag = bulkcreate(techDatabase.products, {
        name: proname.value,
        seller: seller.value,
        price: price.value,
    })


    proname.value = seller.value = price.value = "";
    getData(techDatabase.products,(data)=>{
        userid.value = data.id + 1 || 1;

    });
}


btnread.onclick = table;

function table(){
    const tableBody = document.getElementById("tbody");
    let tableData = document.createElement("td");
    console.log(tableBody);

    console.log(tableData);
}

