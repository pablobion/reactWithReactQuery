import { Routes, Route } from "react-router-dom"

import Repos from './pages/Repos'
import Repo from './pages/Repo'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Repos/>}/>
        <Route path="/repo/*" element={<Repo/>}/>
      </Routes>
    </>
  )
}

