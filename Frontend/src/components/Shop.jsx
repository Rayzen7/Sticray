import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to get data", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='font-poppins' id='shop'>
      <h1 className="font-[600] text-center mt-12 text-[40px]">Shopping</h1>
      <div className='flex lg:flex-row flex-col justify-center items-center mt-10 mb-24 flex-wrap gap-16 mx-5'>
        {products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id} className='flex flex-col cursor-pointer'>
            <img src={product.fileName} alt={product.title} className='w-[220px] h-auto' />
            <p className='font-[600] text-[20px] mt-5'>{product.title}</p>
            <p className='font-[600] text-orange'>Rp. {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
