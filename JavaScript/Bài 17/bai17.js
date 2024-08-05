// utils.js
(function (global) {
  // Khai báo biến toàn cục
  const keyLocalStorageListSP = "DANHSACHSP";
  const keyLocalStorageItemCart = "DANHSACHITEMCART";

  // Hàm lưu dữ liệu vào localStorage
  function saveToLocalStorage(key, value) {
    if (Array.isArray(value)) {
      if (keyLocalStorageListSP == key) {
        let listDataGetLocalStorage = getFromLocalStorage(key);
        if (!listDataGetLocalStorage) {
          // lưu dữ liệu vào json
          localStorage.setItem(key, JSON.stringify(value));
        }
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      console.error("Dữ liệu truyền vào sai định dạng");
    }
  }

  // Hàm lấy dữ liệu từ localStorage
  function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value) || [];
    } catch (error) {
      console.error("Lỗi chuyển đổi kiểu dữ liệu:", error);
      return [];
    }
  }

  // Hàm xóa dữ liệu khỏi localStorage
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  // Hàm gọi API
  async function fetchFromApi(url, options) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Phản hồi không tình công");
      }
      return await response.json();
    } catch (error) {
      console.error("Gọi API thất bại:", error);
      throw error;
    }
  }

  // Hàm tính tổng
  Array.prototype.calculateCartTotals = function () {
    if (
      this.some(
        (item) =>
          typeof item.soLuong !== "number" || typeof item.price !== "number"
      )
    ) {
      console.error("Lỗi kiểu dữ liệu.");
      return;
    }

    const totalQuantity = this.reduce((acc, item) => acc + item.soLuong, 0);
    const totalPrice = this.reduce(
      (acc, item) => acc + item.price * item.soLuong,
      0
    );

    this.results = {
      sum: totalQuantity,
      totalPrice: totalPrice,
    };
  };

  global.utils = {
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    fetchFromApi,
  };
})(window);
