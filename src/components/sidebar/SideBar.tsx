
import { Blocks, Home, Settings, UserCircle2, BadgePlus } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const SideBar = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-14 bg-black shadow-sm py-4">
            <div className="flex flex-col justify-center items-center grow w-full">
                <div className='mb-3 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-800'>
                    <NavLink to='/'>
                        {({ isActive }) => isActive ? <Home color='#567CFF' /> : <Home />}
                    </NavLink>
                </div>
                <div className='mb-3 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-800 '>
                    <NavLink to='/add-insight'>
                        {({ isActive }) => isActive ? <BadgePlus color="#7eff7a" /> : <BadgePlus />}
                    </NavLink>
                </div>
                <div className='mb-3 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-800 '>
                    <NavLink to='/integrations'>
                        {({ isActive }) => isActive ? <Blocks color="#8D4BE0" /> : <Blocks />}
                    </NavLink>
                </div>
                <div className='mb-3 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-800 '>
                    <NavLink to='/settings'>
                        {({ isActive }) => isActive ? <Settings color="#7AF8FF" /> : <Settings />}
                    </NavLink>
                </div>
            </div>
            <div className="">
                <NavLink to='/account'>
                    {({ isActive }) => isActive ? <UserCircle2 color="#D875FF" /> : <UserCircle2 />}
                </NavLink>
            </div>
        </div>
    )
}
