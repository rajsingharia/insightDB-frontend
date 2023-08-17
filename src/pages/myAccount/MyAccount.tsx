import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

export const MyAccount = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="flex felx-row justify-center items-center h-full">
      <div className="flex flex-col justify-start items-center bg-slate-800 h-full w-1/2 p-5">
        <div>User Details</div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div>{user?.id}</div>
          <div>{user?.email}</div>
          <div>{user?.firstName} {user?.lastName}</div>
          <div>{user?.email}</div>
          <div>{user?.role}</div>
        </div>
      </div>
    </div>
  )
}
