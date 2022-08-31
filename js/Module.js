const productdb = (dbname,table) =>{
    //create DB

    const techDatabase = new Dexie(dbname);
    techDatabase.version(4).stores(table);
    techDatabase.open();

    /*
    const techDatabase = new Dexie('techDatabase');
    techDatabase.version(1).stores({
        friends:'name,age'
    })


     */


    return techDatabase;

}


const bulkcreate = (databaseTable,data) =>{
    let TextboxNotEmpty = isTextboxEmpty(data);
    if (TextboxNotEmpty){
        databaseTable.bulkAdd([data]);
        console.log("data inserted")
    } else {
        console.log("You gotta provide data")
    }
    return TextboxNotEmpty;
}

const isTextboxEmpty = object =>{
    let isTextboxEmpty = false;

    for(const value in object){
        isTextboxEmpty = object[value] !== "" && object.hasOwnProperty(value);
    }
    return isTextboxEmpty;
}


const getData = (databaseTable, func) => {
    let index = 0;
    let object = {};

    databaseTable.count((count) => {
        if (count) {
            databaseTable.each(table => {
                object = sortObject(table);
                func(object, index++);
            })
        } else {
            func(0);
        }
    })
}

const sortObject = sortObject => {
    return {
        id: sortObject.id,
        name: sortObject.name,
        seller: sortObject.seller,
        price: sortObject.price
    };
}


export default productdb;
export{
    bulkcreate,
    getData
}