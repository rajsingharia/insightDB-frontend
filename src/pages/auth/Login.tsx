import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CustomTextField } from '../../components/customMuiComponents/CustomTextField'
import LoginRegisterButton from '../../components/customMuiComponents/CustomLoginRegistrationButton'
import AuthAxios from '../../utils/AuthAxios'
import { LoginOrRegisterEnum } from '../../utils/Constants'


type LoginProps = {
  setLoginOrRegister: React.Dispatch<React.SetStateAction<LoginOrRegisterEnum>>;
  setSnackBar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; }>>;
}

export const Login: React.FC<LoginProps> = ({ setLoginOrRegister, setSnackBar }) => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const { login, setUser } = useContext(AuthContext);
  const authAxios = AuthAxios.getAuthAxios();

  const loginUser = () => {

    const body = {
      email: email,
      password: password
    }
    authAxios.post('/auth/login', body)
      .then((response) => {
        console.log(response);
        login(response.data.token);
        setUser(response.data.user);
        navigate('/',{ replace: true });
      })
      .catch((error) => {
        console.log(error);
        setSnackBar({ open: true, message: error.message });
      });
  }


  return (
    <div className='login-register-card-container'>
      <div className='login-register-card'>
        <div className='login-register-card-header'> Login </div>
        <div className='login-register-card-body'>
          <CustomTextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            color='secondary'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type='password'
            margin="normal"
            size='small'
            color='secondary'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginRegisterButton
            variant="contained"
            fullWidth
            onClick={loginUser}>
            Login
          </LoginRegisterButton>
        </div>
      </div>
      <div>
        <div className='register-half-circle' onClick={() => setLoginOrRegister(LoginOrRegisterEnum.register)}>
          <div className='register-half-circle-text'> Register </div>
        </div>
      </div>
    </div>
  )
}
