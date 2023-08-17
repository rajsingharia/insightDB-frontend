import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import AuthAxios from "../../utils/AuthAxios";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const authAxios = AuthAxios.getAuthAxios();
  const { login, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const loginUser = async (event: React.FormEvent<HTMLDivElement>) => {
    console.log("submittted");
    event.preventDefault();

    const body = {
      email: email,
      password: password
    }
    try {
      const response = await authAxios.post('/auth/login', body);
      console.log(response);
      login(response.data.token);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-center items-center h-1/2 bg-white rounded shadow-sm text-black gap-2 p-3">
        <div className="form" onSubmit={loginUser}>
          <form>
            <div className="mb-2">
              <label>Emai </label>
              <input
                type="text"
                name="uname"
                required
                className="border-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label>Password </label>
              <input
                type="password"
                name="pass"
                required
                className="border-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-center">
              <button className="bg-green-500 rounded text-center hover:bg-green-400 cursor-pointer p-1 text-white"
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
