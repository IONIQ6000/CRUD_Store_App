const productdb = (dbname,table) =>{
    //create DB

    const techDatabase = new Dexie(dbname);
    techDatabase.version(1).stores(table);
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


export default productdb;
export{
    bulkcreate
}