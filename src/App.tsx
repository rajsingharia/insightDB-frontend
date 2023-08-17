
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/Login";
import PrivateRoute from "./utils/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Integrations } from "./pages/integrations/Integrations";
import { MyAccount } from "./pages/myAccount/MyAccount";
import { SideBar } from "./components/sidebar/SideBar";
import { Settings } from "./pages/settings/Settings";
import { AddInsight } from "./pages/addInsight/AddInsight";
import { CircularProgress } from "@mui/material";


function App() {

  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-gray-900 h-screen text-white">
      {
        loading ?
          <div className="flex justify-center items-center h-full w-full">
            <CircularProgress color="inherit" />
          </div>
          :
          <div className="flex flex-row w-full h-full">
            <SideBar />
            <div className="w-full h-full p-4">
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/add-insight' element={<AddInsight />} />
                  <Route path='/integrations' element={<Integrations />} />
                  <Route path='/account' element={<MyAccount />} />
                  <Route path='/settings' element={<Settings />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<NotFount />} />
              </Routes>
            </div>
          </div>
      }
    </div>
  )
}

const NotFount = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1 className="text-3xl font-mono font-bold text-red-600">Not Found {":("}</h1>
    </div>
  )
}

export default App
