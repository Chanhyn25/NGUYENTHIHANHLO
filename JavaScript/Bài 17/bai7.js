const url = "https://vapi.vnappmob.com/api/province/";

async function getThangPho(url) {
  try {
    const data = await utils.fetchFromApi(url);
    let DOMHTML = `<option value="">-- Chọn Tỉnh/Thành phố --</option>`;
    DOMHTML += data.results
      .map(
        (e) =>
          `<option value="${e.province_name}" id_Add01="${e.province_id}">${e.province_name}</option>`
      )
      .join("");
    document.getElementById("city").innerHTML = DOMHTML;
  } catch (error) {
    alert("Lỗi fetch");
  }
}

getThangPho(url);

async function getDistrictsByProvinceID() {
  try {
    const city = document.querySelector("#city option:checked");
    const id = city.getAttribute("id_Add01");
    const data = await utils.fetchFromApi(
      `https://vapi.vnappmob.com/api/province/district/${id}`
    );
    let DOMHTML = `<option value="">-- Chọn Huyện/Quận --</option>`;
    DOMHTML += data.results
      .map(
        (e) =>
          `<option value="${e.district_name}" id_Add02="${e.district_id}">${e.district_name}</option>`
      )
      .join("");
    document.getElementById("district").innerHTML = DOMHTML;
  } catch (error) {
    alert("Lỗi fetch");
  }
}

// Hàm lấy danh sách phường/xã theo huyện/quận
async function getWardsByDistrictsID() {
  try {
    const district = document.querySelector("#district option:checked");
    const id = district.getAttribute("id_Add02");
    const data = await utils.fetchFromApi(
      `https://vapi.vnappmob.com/api/province/ward/${id}`
    );
    let DOMHTML = `<option value="">-- Chọn Phường/Xã --</option>`;
    DOMHTML += data.results
      .map(
        (e) =>
          `<option value="${e.ward_name}" id_Add03="${e.ward_id}">${e.ward_name}</option>`
      )
      .join("");
    document.getElementById("ward").innerHTML = DOMHTML;
  } catch (error) {
    alert("Lỗi fetch");
  }
}
