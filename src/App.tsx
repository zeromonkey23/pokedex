import React from 'react';
import {Outlet} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <section className="text-gray-600 body-font font-sans">
      <h1 className="font-medium leading-tight text-4xl px-5 pt-5 mt-0 mb-5">Pokemon List</h1>
      <div
        className="absolute inset-0 bg-[url(assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container p-10 mb-24 mx-auto bg-white/60 rounded-2xl shadow-2xl">
        <Outlet/>
      </div>
    </section>
  );
}

export default App;
