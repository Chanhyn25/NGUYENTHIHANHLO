function checkQuantity() {
  let listCard = getFromLocalStorage(keyLocalStorageItemCart);
  let product = getFromLocalStorage(keyLocalStorageListSP);

  console.log(product);
  console.log(listCard);
  let isQuantitySufficient = true;

  listCard.forEach((item) => {
    const productItem = product.find((i) => i.id === item.idSP);
    if (productItem && item.quantity < productItem.quantity) {
      alert("Sản phẩm" + i.name + " không đủ để khách hàng đặt");
      isQuantitySufficient = false;
    }
  });

  if (!isQuantitySufficient) {
    return null;
  }

  return listCard;
}

checkQuantity()