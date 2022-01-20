module.exports = (product, temp) => {
    let newTemp = temp.replace(/{%ID%}/g, product.id);
    newTemp = newTemp.replace(/{%NAME%}/g, product.productName);
    newTemp = newTemp.replace(/{%IMAGE%}/g, product.image);
    newTemp = newTemp.replace(/{%FROM%}/g, product.from);
    newTemp = newTemp.replace(/{%NUTRIENTS%}/g, product.nutrients);
    newTemp = newTemp.replace(/{%QUANTITY%}/g, product.quantity);
    newTemp = newTemp.replace(/{%PRICE%}/g, product.price);
    newTemp = newTemp.replace(/{%DESCRIPTION%}/g, product.description);
    if (!product.organic) {
        newTemp = newTemp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return newTemp;
};
