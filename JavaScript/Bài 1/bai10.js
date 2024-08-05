function createIDGenerator() {
  let counter = 0;

  function generateID() {
    return `ID_${counter++}`;
  }

  return generateID;
}

// Tạo một hàm tạo ID mới từ closure
const generateID = createIDGenerator();

// Kiểm tra ID
function isValidID(id) {
  // Kiểm tra xem ID có bắt đầu bằng 'ID_' và tiếp theo là một số không âm hay không
  return /^ID_\d+$/.test(id);
}
