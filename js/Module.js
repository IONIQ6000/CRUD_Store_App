const productDatabase = (dbname, table) => {
    const techDatabase = new Dexie(dbname);
    techDatabase.version(4).stores(table);
    techDatabase.open();
    return techDatabase;
}


const bulkcreate = (databaseTable, data) => {
    let TextboxNotEmpty = isTextboxEmpty(data);
    if (TextboxNotEmpty) {
        databaseTable.bulkAdd([data]);
    }
    return TextboxNotEmpty;
}

const isTextboxEmpty = object => {
    let isTextboxEmpty = false;

    for (const value in object) {
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


const createElement = (tagname, appendTo, func) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (func) func(element);
}

export default productDatabase;
export {
    bulkcreate,
    getData,
    createElement,
}