import axios from "axios";
import { useRef } from "react"
import { useHistory } from "react-router";
import "./register.css"

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
                console.log(history)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
             <>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3>facebook</h3>
                        <p>Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</p>
                    </div>
                    <div className="loginRight" >
                        <form className="loginBox" onSubmit={handleClick}>
                            <input type="text" 
                                required
                                ref={username} 
                                className="UsernameInput" 
                                placeholder="Họ tên" />
                            <input 
                                type="email" 
                                required
                                ref={email} 
                                className="EmailInput" 
                                placeholder="Email hoặc số điện thoại" 
                            />
                            <input 
                                className="passwordInput" 
                                required
                                ref={password} 
                                type="password" 
                                placeholder="Mật khẩu" 
                                minLength="6"
                            />
                            <input 
                                className="passwordInputAgain" 
                                required
                                ref={passwordAgain} 
                                type="password" 
                                placeholder="Nhập lại mật khẩu" 
                            />
                            <button type="submit" className="loginBtn">Đăng ký</button>
                            <p>Quên mật khẩu</p>
                            <hr className="loginHr"/>
                            <button className="registerBtn">Đăng nhập</button>
                        </form>
                    </div> 
                </div>
            </div>
        </>
        </div>
    )
}
