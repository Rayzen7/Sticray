import Footer from "../components/Footer.jsx"
import Navbar from "../components/Navbar.jsx"
import Shop from "../components/Shop.jsx"
import Welcome from "../components/Welcome.jsx"

const Home = () => {
  return (
    <div>
      <div className="z-10 fixed">
        <Navbar/>
      </div>
      <Welcome/>
      <Shop/>
      <Footer/>
    </div>
  )
}

export default Home