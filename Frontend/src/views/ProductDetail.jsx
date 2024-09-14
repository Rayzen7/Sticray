import Product from '../components/Product.jsx';
import Navbar from '../components/Navbar.jsx';

const ProductDetail = () => {
  return (
    <div>
      <div className='z-10 fixed'>
        <Navbar/>
      </div>
        <Product/>
    </div>
  )
}

export default ProductDetail