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