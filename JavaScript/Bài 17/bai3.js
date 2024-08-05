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