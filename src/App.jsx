import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login/Login'
import Overview from './pages/Overview/Overview'
import Products from './pages/Products/Products'
import Order from './pages/Order/Order'
import ProfilePopup from './components/ProfilePopup/ProfilePopup'
import Signin from './pages/Signin/Signin'

function App() {
  const [profile, setProfile] = useState(false)
  return (
    <>
      {profile === true ? <ProfilePopup setProfile={setProfile} /> : null}
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Overview setProfile={setProfile} />} />
          <Route path="/products" element={<Products setProfile={setProfile} />} />
          <Route path="/orders" element={<Order setProfile={setProfile} />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </>
  )
}

export default App
