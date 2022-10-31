import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { IniNavbar } from './components';
import Home from './pages/Home';
import Sukses from './pages/Sukses'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <IniNavbar />
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sukses" element={<Sukses/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}

export default App
