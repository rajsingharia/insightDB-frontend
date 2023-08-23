import { useState } from 'react'
import './LoginRegister.css'
import { Login } from './Login';
import { Register } from './Register';
import { LoginOrRegisterEnum } from '../../utils/Constants';

export default function LoginRegister() {

    const [loginOrRegister, setLoginOrRegister] = useState(LoginOrRegisterEnum.login);

    return (
        <div className="login-register">
            <div>
                {
                    loginOrRegister === LoginOrRegisterEnum.login ?
                        <Login
                            setLoginOrRegister={setLoginOrRegister}
                        /> :
                        <Register
                            setLoginOrRegister={setLoginOrRegister}
                        />
                }
            </div>
        </div>
    )
}
