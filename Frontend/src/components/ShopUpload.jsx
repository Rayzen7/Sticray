import axios from 'axios';
import { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    try {
      const response = await axios.get('https://sticray-api.vercel.app/api/files');
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to get data", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='font-poppins'>
        <h1 className="font-[600] text-center pt-12 text-[40px]">Shopping</h1>
        <div className='flex justify-center items-center mt-10 mb-24 flex-wrap gap-16 mx-5'>
          { products.map (products => (
            <div key={products.id} className='flex flex-col cursor-pointer'>
                <img src={products.fileName} alt="" className='w-[220px] h-auto'/>
                <p className='font-[600] text-[20px] mt-5'>{products.title}</p>
                <p className='font-[600] text-orange'>Rp. {products.price}</p>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Shop