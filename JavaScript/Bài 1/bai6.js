// bài 6

function renderCart() {
  // lấy sản phẩm có trong giỏ hàng đi so sánh
  let listCard = getFromLocalStorage(keyLocalStorageItemCart);

  // lấy
  const cartDetails = listCard.map((item) => {
    const product = listData.find((p) => p.id === item.idSP);
    return {
      ...product,
      soLuong: item.soLuong,
    };
  });

  document.getElementById("tbody").innerHTML = cartDetails
    .map(
      (item) => `
              <tr>
                <td>${item.name}</td>
                <td with="100%">
                  <img
                    width="15%"
                    src="${item.img}"
                    alt="loi"
                /></td>
                <td>${item.price.toLocaleString("vi-VN")} VND</td>
                <td>${item.soLuong}</td>
                <td>${(item.price * item.soLuong).toLocaleString(
                  "vi-VN"
                )} VND</td>
                <td>Xoá</td>
              </tr>
    `
    )
    .join("");

  const totalQuantity = cartDetails.reduce(
    (acc, item) => acc + item.soLuong,
    0
  );

  const totalPrice = cartDetails.reduce(
    (acc, item) => acc + item.price * item.soLuong,
    0
  );

  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent =
    totalPrice.toLocaleString("vi-VN");

  // cartSummary.style.display = cartItems.length > 0 ? "block" : "none";
}
renderCart();
