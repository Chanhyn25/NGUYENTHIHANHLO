document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.LoginButton');
    const loginModal = document.querySelector('.containerLogin');
    const closeModal = document.querySelector('.close');
    const loginForm = document.querySelector('#loginForm');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const usernameError = document.querySelector('#usernameError');
    const passwordError = document.querySelector('#passwordError');
    const loginError = document.querySelector('#loginError');
    const loginSubmit = document.querySelector('#loginSubmit');

    // Hiển thị modal khi click vào nút Đăng nhập hệ thống
    loginButton.addEventListener('click', function () {
        loginModal.style.display = 'block';
    });

    // Đóng modal khi click vào nút đóng (dấu X)
    closeModal.addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    // Đóng modal khi click bên ngoài modal
    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Xử lý khi người dùng submit form
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Xóa thông báo lỗi cũ (nếu có)
        usernameError.textContent = '';
        passwordError.textContent = '';
        loginError.textContent = '';

        // Lấy giá trị từ input
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Kiểm tra nếu username hoặc password trống
        if (!username || !password) {
            if (!username) {
                usernameError.textContent = 'Vui lòng nhập tên đăng nhập';
            }
            if (!password) {
                passwordError.textContent = 'Vui lòng nhập mật khẩu';
            }
            return; // Dừng lại nếu có lỗi
        }

        // Kiểm tra thông tin đăng nhập
        if (username === 'admin' && password === 'admin') {
            // Nếu đăng nhập thành công
            loginSubmit.textContent = 'Đang nhập...';
            loginSubmit.disabled = true;

            // Giả lập thời gian đăng nhập (ở đây là 1 giây)
            setTimeout(function () {
                loginModal.style.display = 'none'; // Đóng modal
                loginButton.textContent = 'Đăng nhập thành công'; // Thay đổi nút
            }, 1000);
        } else {
            // Nếu username hoặc password không đúng
            loginError.textContent = 'Tài khoản hoặc mật khẩu không đúng';
        }
    });
});
