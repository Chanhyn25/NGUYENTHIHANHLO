function createOder(data) {
  if (data) {
    try {
      const detailOrder = data.order;

      let product = utils.getFromLocalStorage(keyLocalStorageListSP);
      detailOrder.forEach((item) => {
        let productItem = product.find((i) => i.id == item.idSP);
        if (productItem) {
          productItem.quantity -= item.soLuong;
        }
      });

      // lưu order
      addOrder(data);
      // cập nhật sp
      utils.saveToLocalStorage(keyLocalStorageListSP, product);
      // xoá cart
      utils.removeFromLocalStorage(keyLocalStorageItemCart);
    } catch (e) {
      console.error(e);
    }
  } else {
    alert("lỗi dữ liệu");
  }
}
