import React from 'react';
import {Outlet} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <nav className="bg-red-600 px-2 sm:px-4 py-2.5 shadow fixed w-full z-50">
        <div className="container flex flex-wrap items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={require('./assets/logo.png')} className="h-12 mr-3 sm:h-9" alt="Pokemon Logo"/>
            <span className="self-center text-2xl font-extrabold whitespace-nowrap text-neutral-100">Pokédex Govtech</span>
          </a>
        </div>
      </nav>
      <aside className="w-52 fixed mt-14 h-full shadow" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 h-full">
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="/"
                className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100">
                <span className="ml-3">List</span>
              </a>
            </li>
            <li>
              <a href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100">
                <span className="ml-3">Compare</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <section className="text-gray-600 body-font font-sans ml-56 pt-20 pr-6">
        <div
          className="absolute -z-10 inset-0 bg-[url(assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container p-6 mb-24 mx-auto bg-white/60 rounded-2xl shadow-2xl">
          <Outlet/>
        </div>
      </section>
    </>
  );
}

export default App;
