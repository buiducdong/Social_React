import "./login.css"

export default function Login() {
    const handleClick = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3>facebook</h3>
                        <p>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</p>
                    </div>
                    <div className="loginRight">
                        <form className="loginBox" onSubmit={handleClick}>
                            <input type="text" className="EmailInput" placeholder="Email hoặc số điện thoại" />
                            <input className="passwordInput" type="password" placeholder="Mật khẩu" />
                            <button className="loginBtn">Đăng nhập</button>
                            <p>Quên mật khẩu</p>
                            <hr className="loginHr"/>
                            <button className="registerBtn">Tạo tài khoản mới</button>
                        </form>
                    </div> 
                </div>
            </div>
        </>
    )
}
