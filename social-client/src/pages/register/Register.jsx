import "./register.css"

export default function Register() {
    return (
        <div>
             <>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3>facebook</h3>
                        <p>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</p>
                    </div>
                    <div className="loginRight">
                        <div className="loginBox">
                            <input type="text" className="UsernameInput" placeholder="Họ tên" />
                            <input type="text" className="EmailInput" placeholder="Email hoặc số điện thoại" />
                            <input className="passwordInput" type="password" placeholder="Mật khẩu" />
                            <button className="loginBtn">Đăng nhập</button>
                            <p>Quên mật khẩu</p>
                            <hr className="loginHr"/>
                            <button className="registerBtn">Tạo tài khoản mới</button>
                        </div>
                    </div> 
                </div>
            </div>
        </>
        </div>
    )
}
