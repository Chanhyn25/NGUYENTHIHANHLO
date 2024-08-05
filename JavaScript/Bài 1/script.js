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

function saveListDataToLocalStorage(listData) {
  // kiểm tra xem có phải dữ liệu dạng mảng không
  if (Array.isArray(listData)) {
    try {
      let listDataGetLocalStorage = getFromLocalStorage(keyLocalStorageListSP);
      if (!listDataGetLocalStorage) {
        // lưu dữ liệu vào json
        saveToLocalStorage(keyLocalStorageListSP, listData);
        console.log("Lưu sản phẩm thành công");
      }
    } catch (e) {
      // báo lỗi khi lưu không thành công
      console.error("Lưu dữ liệu không thành công", e);
    }
  } else {
    console.error("Dữ liệu không giống định dạng");
  }
}

saveListDataToLocalStorage(listData);

// bài 3

function getListDataFromLocalStorage() {
  let listDataGetLocalStorage = getFromLocalStorage(keyLocalStorageListSP);

  if (listDataGetLocalStorage) {
    try {
      if (Array.isArray(listDataGetLocalStorage)) {
        renderProduct(listDataGetLocalStorage);
      } else {
        console.log("Dữ liệu không đúng định dạng");
      }
    } catch (e) {
      console.error("Dữ liệu trả về không thể phân tích", e);
    }
  } else {
    console.error("Không tìm thấy dữ liệu");
  }
}

function renderProduct(listProduct) {
  const container = document.getElementById("listProduct");

  container.innerHTML = listProduct
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
              <button class="btn btn-primary" onclick="addToCart(${product.id
        })">Add to Cart</button>
            </div>
          </div>
          </div>
    `
    )
    .join("");
}

getListDataFromLocalStorage();

// bài 4

function addToCart(id) {
  // lấy dữ liệu từ giỏ hàng nếu có từ trước

  let listProductCard = getFromLocalStorage(keyLocalStorageItemCart);

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
    saveToLocalStorage(keyLocalStorageItemCart, listProductCard);
    alert("Lưu giỏ hàng thành công");
  } catch (x) {
    console.error("Lưu giỏ hàng thất bại");
  }
}
// bài 5

Array.prototype.calculate = function () {
  const results = new Map();

  // tính tổng
  results.set(this.reduce((acc, val) => acc + val, 0));
  // tính thich
  results.set(this.reduce((acc, val) => acc * val, 1));

  this.getResults = function () {
    return results;
  };
};
