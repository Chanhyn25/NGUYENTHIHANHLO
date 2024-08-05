const tableHistory = document.getElementById("tableHistory");
const processOrders = async () => {
  const listOrder = await getOrders();
  let quantity = 0;
  let quantityItem = 0;
  let sumPrice = 0;
  if (listOrder) {
    let product = getFromLocalStorage(keyLocalStorageListSP);
    const historyList = listOrder.flatMap((item) => {
      quantity = 0;
      quantityItem = 0;
      sumPrice = 0;
      const historyDetail = item.order.map((order) => {
        let productItem = product.find((i) => i.id == order.idSP);
        quantity += order.soLuong;
        sumPrice += order.soLuong * productItem.price;
        quantityItem += 1;
        return {
          ...productItem,
          soLuong: order.soLuong,
        };
      });

      return {
        id: item.id,
        khacHang: item.hoTen,
        itemNumber: quantityItem,
        totalQuantity: quantity,
        priceTotal: sumPrice,
        ngayMua: item.ngayMuaHang,
        historyDetail,
      };
    });
    return historyList;
  }
  return [];
};
const renderHistory = async () => {
  let historyShoping = await processOrders();

  let renderView = "";
  historyShoping.map((element) => {
    renderView += `<tr>
            <td>
              <a data-bs-toggle="collapse" href="#collapseExample_${element.id}">Details</a>
            </td>
            <td>${element.khacHang}</td>
            <td>${element.ngayMua}</td>
            <td>${element.itemNumber}</td>
            <td>${element.totalQuantity}</td>
            <td>${element.priceTotal} VND</td>
            <td><button class="btn btn-danger" onclick="removeOrder('${element.id}')">X</button></td>
          </tr>`;

    element.historyDetail.map((detail) => {
      renderView += ` <tr class="collapse" id="collapseExample_${element.id}">
            <td>ID: ${detail.id}</td>
            <td>Image: <img src="${detail.img}" width="20%" alt=""></td>
            <td>Name:${detail.name}</td>
            <td>Price:${detail.price}</td>
            <td>Quantity:${detail.soLuong}</td>
            <td>Total Price: ${detail.price * detail.soLuong}</td>
          </tr>`;
    });
  });

  tableHistory.innerHTML += renderView;
};
renderHistory();

const removeOrder = async (id) => {
  let order = await getOrderById(id);
  if (order) {
    try {
      const detailOrder = order.order;

      let product = getFromLocalStorage(keyLocalStorageListSP);
      detailOrder.forEach((item) => {
        let productItem = product.find((i) => i.id == item.idSP);
        if (productItem) {
          productItem.quantity += item.soLuong;
        }
      });
      // lưu order
      deleteOrder(order.id);
      // cập nhật sp
      saveToLocalStorage(keyLocalStorageListSP, product);
    } catch (e) {
      console.error(e);
    }
  } else {
    alert("lỗi dữ liệu");
  }
};
