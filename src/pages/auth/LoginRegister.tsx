import { useState } from 'react'
import './LoginRegister.css'
import { Login } from './Login';
import { Register } from './Register';
import { LoginOrRegisterEnum } from '../../utils/Constants';
import { Snackbar } from '@mui/material';

export default function LoginRegister() {

    const [loginOrRegister, setLoginOrRegister] = useState(LoginOrRegisterEnum.login);
    const [snackBar, setSnackBar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });

    return (
        <div className="login-register">
            <div>
                {
                    loginOrRegister === LoginOrRegisterEnum.login ?
                        <Login
                            setLoginOrRegister={setLoginOrRegister}
                            setSnackBar={setSnackBar}
                        /> :
                        <Register
                            setLoginOrRegister={setLoginOrRegister}
                            setSnackBar={setSnackBar}
                        />
                }
            </div>
            {
                snackBar.open &&
                <Snackbar
                    open={snackBar.open}
                    onClose={() => setSnackBar({ open: false, message: '' })}
                    message={snackBar.message}
                />
            }
        </div>
    )
}
