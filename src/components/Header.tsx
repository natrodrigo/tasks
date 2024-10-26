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
    <header className="bg-white py-4 max-w-100 mx-auto px-4 flex justify-between dark:bg-slate-800">
      <div>
          <a href="#" className="flex items-center">
          <img src={logo} alt="Pizza deliciosa, logo da pizzaria" className="h-24"/>
          </a>
      </div>
      <nav className="hidden md:flex items-center space-x-1 font-medium">
          <a href="#" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Home</a>
          <a href="#menu" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Cardápio</a>
          <a href="https://wa.me/551132303223" target="_blank" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Faça seu pedido</a>
          <a href="#" className="py-2 px-3 text-teal-900 hover:text-emerald-500 dark:text-emerald-600">Sobre nós</a>
          <button onClick={handleOnClick} className='hover:bg-slate-900 dark:hover:bg-white rounded-full text-xl p-2 text-yellow-500 dark:text-slate-600'> {darkMode ? <FaMoon /> : <FaSun />}</button>
      </nav>
    </header>
    )
}