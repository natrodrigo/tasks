import { SetStateAction, Dispatch } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'
import logo from '/logo.png';

interface IProps {
    darkMode: boolean
    setDarkMode: Dispatch<SetStateAction<boolean>>
}

export default function Header ({darkMode, setDarkMode}: IProps) {

    const handleOnClick = () => {
        setDarkMode(!darkMode);
    }

    return (
    <header className="bg-white p-2 max-w-100 mx-auto flex justify-between dark:bg-slate-800">
      <div>
          <a href="#" className="flex items-center">
          <img src={logo} alt="Pizza deliciosa, logo da pizzaria" className="h-16"/>
          </a>
      </div>
      <nav className="hidden md:flex items-center space-x-1 font-bold">
          <a href="#" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Home</a>
          <a href="#" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Sobre nós</a>
          <button onClick={handleOnClick} className='hover:bg-slate-900 dark:hover:bg-white rounded-full text-xl p-2 text-yellow-500 dark:text-slate-600'> {darkMode ? <FaMoon /> : <FaSun />}</button>
      </nav>
    </header>
    )
}