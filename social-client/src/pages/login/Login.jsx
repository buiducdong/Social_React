import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@mui/material';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };
    console.log(user)

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
                            <input type="email" required className="EmailInput" placeholder="Email hoặc số điện thoại" ref={email}/>
                            <input className="passwordInput" required minLength="6" type="password" placeholder="Mật khẩu" ref={password}/>
                            <button 
                                className="loginBtn" 
                                type="submit"
                                disabled={isFetching}>
                                    {isFetching ? <CircularProgress color="inherit" size="20px"/> : "Đăng nhập"}
                            </button>
                            <p>Quên mật khẩu</p>
                            <hr className="loginHr"/>
                            <button 
                                className="registerBtn"
                                disabled={isFetching}>
                                {isFetching ? <CircularProgress color="inherit" size="20px"/> : "Tạo tài khoản mới"}
                            </button>
                        </form>
                    </div> 
                </div>
            </div>
        </>
    )
}
