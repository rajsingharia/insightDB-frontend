import { useState } from 'react'
import { LoginOrRegisterEnum } from '../../utils/Constants'
import { CustomTextField } from '../../components/customMuiComponents/CustomTextField'
import LoginRegisterButton from '../../components/customMuiComponents/CustomLoginRegistrationButton'
import AuthAxios from '../../utils/AuthAxios'


interface registerUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

type RegisterProps = {
  setLoginOrRegister: React.Dispatch<React.SetStateAction<LoginOrRegisterEnum>>
}


export const Register: React.FC<RegisterProps> = ({ setLoginOrRegister }) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authAxios = AuthAxios.getAuthAxios();

  const registerUser = () => {
    console.log(`Register user with name: ${name}, email: ${email} and password: ${password}`);

    const body: registerUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    authAxios.post('/auth/register', body)
      .then((response) => {
        console.log(response);
        setLoginOrRegister(LoginOrRegisterEnum.login)
      })
      .catch((error) => {
        console.log(error);
      });

  }


  return (
    <div className='login-register-card-container'>
      <div className='login-register-card'>
        <div className='login-register-card-header'> Register </div>
        <div className='login-register-card-body'>
          <CustomTextField
            id="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            color='secondary'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <CustomTextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size='small'
            color='secondary'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <CustomTextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            type='email'
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
            margin="normal"
            size='small'
            type='password'
            color='secondary'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginRegisterButton
            variant="contained"
            fullWidth
            onClick={registerUser}>
            Register
          </LoginRegisterButton>
        </div>
      </div>
      <div>
        <div className='login-half-circle flex-end' onClick={() => setLoginOrRegister(LoginOrRegisterEnum.login)}>
          <div className='login-half-circle-text'> Login </div>
        </div>
      </div>
    </div>
  )
}
