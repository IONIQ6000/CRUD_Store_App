import productdb,{
    bulkcreate
} from './Module.js';

let techDatabase = productdb("Productdb",{
    products:`++id, name, seller, price`
});

// input tags
const userid = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// button function
const btncreate = document.getElementById("btn-create");
const btnreact = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");


// insert value using create button

btncreate.onclick = (event) =>{
    let flag = bulkcreate(techDatabase.products,{
        name : proname.value,
        seller : seller.value,
        price : price.value,
    } )
    //console.log(flag);


    proname.value = seller.value = price.value = "";
    getData();
}

const getData = () => {
    let index = 0;
    let object = {};

    techDatabase.products.count((count) => {
        if(count){
            techDatabase.products.each(table => {
                console.log(table);
            })
        }
    })
}