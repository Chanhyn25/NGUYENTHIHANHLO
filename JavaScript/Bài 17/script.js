// bài 1
var listData = new Array();

listData = [
  {
    id: 1,
    name: "product01",
    img: "https://via.placeholder.com/640x480.png/008822?text=recusandae",
    price: 100000,
    quantity: 10000,
  },
  {
    id: 2,
    name: "product02",
    img: "https://via.placeholder.com/640x480.png/008822?text=recusandae",
    price: 100000,
    quantity: 10000,
  },
];

var keyLocalStorageListSP = "DANHSACHSP";

var keyLocalStorageItemCart = "DANHSACHITEMCART";

// bài 2
utils.saveToLocalStorage(keyLocalStorageListSP, listData);

// bài 3
const listDataGetLocalStorage = utils.getFromLocalStorage(
  keyLocalStorageListSP
);

const container = document.getElementById("listProduct");
if (container) {
  container.innerHTML = listDataGetLocalStorage
    .map(
      (product) => `
      <div class="col-md-3" >
      <div class="card">
            <img
              src="${product.img}" class="card-img-top" alt="${product.name}"
            />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.price.toLocaleString(
                "vi-VN"
              )} VND</p>
              <p class="card-text">Quantity: ${product.quantity}</p>
              <button class="btn btn-primary" onclick="addToCart(${
                product.id
              })">Add to Cart</button>
            </div>
          </div>
          </div>
    `
    )
    .join("");
}
// bài 4

function addToCart(id) {
  // lấy dữ liệu từ giỏ hàng nếu có từ trước

  let listProductCard = utils.getFromLocalStorage(keyLocalStorageItemCart);

  // khởi tạo đối tượng sản phẩm

  let checkCard = false;

  // trường hợp sản phẩm đã tồn tại
  if (listProductCard) {
    listProductCard = listProductCard.map((x) => {
      if (x.idSP === id) {
        x.soLuong += 1;
        checkCard = true;
      }
      return x;
    });
  } else {
    listProductCard = [];
  }
  // trường hợp sản phẩm chưa tồn tại

  if (!checkCard) {
    listProductCard.push({ idSP: id, soLuong: 1 });
  }

  // lưu giỏ hàng lên localStorage

  try {
    utils.saveToLocalStorage(keyLocalStorageItemCart, listProductCard);
    alert("Lưu giỏ hàng thành công");
  } catch (x) {
    console.error("Lưu giỏ hàng thất bại");
  }
}
