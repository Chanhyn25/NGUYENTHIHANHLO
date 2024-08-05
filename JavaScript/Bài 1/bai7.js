const url = "https://vapi.vnappmob.com/api/province/";

async function getThangPho(url) {
  try {
    const connect = await fetch(url);
    if (!connect.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await connect.json();
    let DOMHTML = `<option value = "">-- Chọn Tỉnh/Thành phố --</option>`;
    DOMHTML += data.results.map(
      (e) =>
        `<option value="${e.province_name}" id_Add01="${e.province_id}">${e.province_name}</option>`
    );
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
    const connect = await fetch(
      `https://vapi.vnappmob.com/api/province/district/${id}`
    );
    if (!connect.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await connect.json();
    let DOMHTML = `<option>-- Chọn Huyện/Quận --</option>`;
    DOMHTML += data.results.map(
      (e) =>
        `<option value="${e.district_name}" id_Add02="${e.district_id}">${e.district_name}</option>`
    );
    document.getElementById("district").innerHTML = DOMHTML;
  } catch (error) {
    alert("Lỗi fetch");
  }
}

async function getWardsByDistrictsID() {
  try {
    const district = document.querySelector("#district option:checked");
    const id = district.getAttribute("id_Add02");
    const connect = await fetch(
      `https://vapi.vnappmob.com/api/province/ward/${id}`
    );
    if (!connect.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await connect.json();
    let DOMHTML = `<option>-- Chọn Phường/Xã --</option>`;
    DOMHTML += data.results.map(
      (e) =>
        `<option value="${e.ward_name}" id_Add03="${e.ward_id}">${e.ward_name}</option>`
    );
    document.getElementById("ward").innerHTML = DOMHTML;
  } catch (error) {
    alert("Lỗi fetch");
  }
}
