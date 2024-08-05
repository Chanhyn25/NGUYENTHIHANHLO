const dataForm = document.getElementById("dataForm");

document.getElementById("onSubmit").addEventListener("click", (event) => {
  event.preventDefault();
  const formupdate = new FormData(dataForm);
  const dataupdate = {};
  let isValude = true;
  // const idupdate = document.getElementById("idupdate").value;
  formupdate.forEach((value, key) => {
    const error = document.getElementById(`${key}-error`);
    if (
      value == "" ||
      value === null ||
      value === "-- Chọn Tỉnh/Thành phố --" ||
      value === "-- Chọn Huyện/Quận --" ||
      value === "-- Chọn Phường/Xã --"
    ) {
      if (key !== "ghiChu") {
        isValude = false;
        error.classList.add("visible");
      }
    } else {
      isValude = true;
      if (key === "std") {
        if (!validatePhoneNumber(value)) {
          isValude = false;
          error.classList.add("visible");
        }
      }
      if (key === "email") {
        if (!validateEmail(value)) {
          isValude = false;
          error.classList.add("visible");
        }
      }
    }
    if (isValude) {
      if (key !== "ghiChu") {
        error.classList.remove("visible");
      }
      dataupdate[key] = value;
    }
  });
  const formOrder = formatObj(dataupdate);
  createOder(formOrder);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhoneNumber(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}
//12
function checkQuantity() {
  let listCard = getFromLocalStorage(keyLocalStorageItemCart);
  let product = getFromLocalStorage(keyLocalStorageListSP);

  let isQuantitySufficient = true;

  listCard.forEach((item) => {
    const productItem = product.find((i) => i.id === item.idSP);
    if (productItem && item.soLuong > productItem.quantity) {
      isQuantitySufficient = false;
    }
  });

  if (!isQuantitySufficient) {
    alert("Sản phẩm  không đủ để khách hàng đặt");
    return null;
  }

  return listCard;
}

function formatObj(data) {
  const order = checkQuantity();
  if (order) {
    const khachHang = {
      id: generateID(),
      hoTen: data.ho + " " + data.ten,
      email: data.email,
      sdt: data.sdt,
      diaChiNhanHang:
        data.soNha +
        ", " +
        data.PhuongXa +
        ", " +
        data.quanHuyen +
        ", " +
        data.thanhPho,
      ghiChu: data.ghiChu,
      ngayMuaHang: formatDate(),
      order: order,
    };
    return khachHang;
  }
}
function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
