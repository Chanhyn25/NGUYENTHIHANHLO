
// bài 2

function saveListDataToLocalStorage(listData) {
    // kiểm tra xem có phải dữ liệu dạng mảng không
    if (Array.isArray(listData)) {
        // chuyển đổi dữ liệu thành json
        let jsonStringListData = JSON.stringify(listData);
        try {
            // lưu dữ liệu vào json
            localStorage.setItem(keyLocalStorageListSP, jsonStringListData);
            console.log("Lưu sản phẩm thành công");
        } catch (e) {
            // báo lỗi khi lưu không thành công
            console.error("Lưu dữ liệu không thành công", e);
        }
    } else {
        console.error("Dữ liệu không giống định dạng");
    }
}

saveListDataToLocalStorage(listData);