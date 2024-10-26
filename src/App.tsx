

import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/Header";
import Card from "./components/Card";
import pizzaItems from "./utils/pizzaItems.json"
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <main className="flex flex-col gap-24 py-16 px-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center justify-center gap-48">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl mb-8 font-bold text-teal-900 dark:text-emerald-400">Experimente o sabor que você jamais vai esquecer</h1>
            <a href="#menu" className="bg-red-900 text-white px-4 py-2 rounded shadow-md hover:bg-red-800 transition duration-300">Confira o cardápio</a>
          </div>
          <div className="hidden md:block max-w-96">
            <img className="max-w-96 rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pizza carro-chefe"/>
          </div>
        </div>
        <div className="flex flex-col items-center" id="menu">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-900 dark:text-emerald-400">Nosso cardápio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pizzaItems.map((pizzaItem) => {
              return <Card title={pizzaItem.title} price={pizzaItem.price} imageLink={pizzaItem.imgUrl} />
            })}
          </div>
          <a 
              href="https://wa.me/551132303223"
              target="_blank" 
              className="w-82 flex justify-between items-center gap-2 mt-6 bg-red-900 text-white px-4 py-2 rounded shadow-md hover:bg-red-800 transition duration-300"
          >
            <span>Gostei, quero comprar!</span> 
            <FaWhatsapp/>
          </a>
        </div>
      </main>
      <footer className="bg-white py-6 px-4 flex justify-center dark:bg-slate-800">
          <p className="text-gray-600 text-center dark:text-gray-300">© 2024 Pizzaria Deliciosa. Esta é uma página fictícia.</p>
      </footer>
    </div>
  )
}

export default App
