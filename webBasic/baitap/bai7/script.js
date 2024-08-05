$(document).ready(function () {
    const loginButton = $('.LoginButton');
    const loginModal = $('.containerLogin');
    const closeModal = $('.close');
    const loginForm = $('#loginForm');
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const usernameError = $('#usernameError');
    const passwordError = $('#passwordError');
    const loginError = $('#loginError');
    const loginSubmit = $('#loginSubmit');
    const changePasswordForm = $('#changePasswordForm');
    const oldPasswordInput = $('#oldPassword');
    const newPasswordInput = $('#newPassword');
    const oldPasswordError = $('#oldPasswordError');
    const newPasswordError = $('#newPasswordError');
    const changePasswordSuccess = $('#changePasswordSuccess');
    let previousPassword = 'admin'; // Mật khẩu trước đó

    // Hiển thị modal khi click vào nút Đăng nhập hệ thống
    loginButton.click(function () {
        loginModal.show();
    });

    // Đóng modal khi click vào nút đóng (dấu X)
    closeModal.click(function () {
        loginModal.hide();
    });

    // Đóng modal khi click bên ngoài modal
    $(window).click(function (event) {
        if (event.target === loginModal[0]) {
            loginModal.hide();
        }
    });

    // Hiển thị form đổi mật khẩu khi click vào liên kết Quên mật khẩu
    loginForm.on('click', '#forgotPasswordLink', function (event) {
        event.preventDefault();
        loginForm.hide();
        changePasswordForm.show();
    });

    // Xử lý khi nhấn "Save" trong form đổi mật khẩu
    changePasswordForm.on('click', '#savePassword', function () {
        // Xóa thông báo lỗi cũ
        oldPasswordError.text('');
        newPasswordError.text('');
        changePasswordSuccess.text('');

        // Lấy giá trị từ các input
        let oldPassword = oldPasswordInput.val().trim();
        let newPassword = newPasswordInput.val().trim();

        // Kiểm tra nếu OldPassword hoặc NewPassword không được nhập
        if (!oldPassword || !newPassword) {
            if (!oldPassword) {
                oldPasswordError.text('Bắt buộc nhập');
            }
            if (!newPassword) {
                newPasswordError.text('Bắt buộc nhập');
            }
            return;
        }

        // Kiểm tra nếu OldPassword không trùng với mật khẩu trước đó
        if (oldPassword !== previousPassword) {
            oldPasswordError.text('Password không đúng');
            return;
        }

        // Kiểm tra nếu NewPassword trùng với OldPassword
        if (newPassword === oldPassword) {
            newPasswordError.text('Mật khẩu mới không được trùng mật khẩu cũ');
            return;
        }

        // Nếu không có lỗi, hiển thị thông báo thành công và đổi form về trạng thái ban đầu
        changePasswordSuccess.text('Bạn đã đổi mật khẩu thành công');
        changePasswordForm.hide();
        loginForm.show();
        previousPassword = newPassword; // Cập nhật mật khẩu mới
    });

    // Xử lý khi submit form đăng nhập
    loginForm.submit(function (event) {
        event.preventDefault(); // Ngăn chặn form submit

        // Xóa thông báo lỗi cũ
        usernameError.text('');
        passwordError.text('');
        loginError.text('');

        // Lấy giá trị từ các input
        let username = usernameInput.val().trim();
        let password = passwordInput.val().trim();

        // Kiểm tra nếu username hoặc password trống
        if (!username || !password) {
            if (!username) {
                usernameError.text('Vui lòng nhập tên đăng nhập');
            }
            if (!password) {
                passwordError.text('Vui lòng nhập mật khẩu');
            }
            return; // Dừng lại nếu có lỗi
        }

        // Kiểm tra thông tin đăng nhập
        if (username === 'admin' && password === previousPassword) {
            // Nếu đăng nhập thành công
            loginSubmit.text('Đang nhập...');
            loginSubmit.prop('disabled', true);

            // Giả lập thời gian đăng nhập (ở đây là 1 giây)
            setTimeout(function () {
                loginModal.hide(); // Đóng modal
                loginButton.text('Đăng nhập thành công'); // Thay đổi nút
            }, 1000);
        } else {
            // Nếu username hoặc password không đúng
            loginError.text('Tài khoản hoặc mật khẩu không đúng');
        }
    });
});
