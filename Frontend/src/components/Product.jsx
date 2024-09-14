import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import star from '../assets/star.png';
import Swal from 'sweetalert2';
import 'boxicons';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://sticray-api.vercel.app/api/files/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Failed to fetch product details');
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchProduct();
  }, [id]);

  // Increase quantity
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrease quantity
  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  // Handle buy SweetAlert2
  const handleBuy = () => {
    const priceTotal = quantity * Number(product.price);
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to buy ${quantity} ${product.title}(s) for Rp. ${priceTotal.toLocaleString('id-ID')}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bg-orange hover:opacity-85 mr-16 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
      },
      buttonsStyling: false
      // Whatsapp
    }).then((result) => {
      if (result.isConfirmed) {
        const whatsappMessage = `Saya ingin membeli Produk ${product.title} sebanyak ${quantity} dan dengan harga Rp. ${priceTotal.toLocaleString('id-ID')}`;
        const whatsappURL = `https://wa.me/6281219538787?text=${encodeURIComponent(whatsappMessage)}`;
        window.location.href = whatsappURL;
      }
    });
  };

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='font-poppins p-5 block mx-auto lg:w-[700px] w-[100%]'>
      <div className='flex justify-center items-center gap-6 lg:mt-20 mt-28'>
        <img src={product.fileName} alt="" className='lg:w-[475px] w-[210px] h-auto'/>
        <div className='flex flex-col gap-3'>
          <img src={product.fileName} alt="" className='lg:w-[150px] w-[60px] h-auto'/>
          <img src={product.fileName} alt="" className='lg:w-[150px] w-[60px] h-auto'/>
          <img src={product.fileName} alt="" className='lg:w-[150px] w-[60px] h-auto'/>
        </div>
      </div>
      <div className='mt-6 flex lg:flex-row flex-col-reverse justify-between items-start'>
        <div className='ml-2'>
          <h1 className='font-[600] lg:text-[40px] text-[27px]'>{product.title}</h1>
          <p className='font-[500] text-[18px] lg:pt-0 pt-2'>Rp. {product.price}</p>
        </div>
        <img src={star} alt="" className='lg:w-[160px] w-[100px] h-auto lg:mr-2 lg:ml-0 ml-2 mt-2'/>
      </div>
      <div className='mt-16 mx-2'>
        <h1 className='font-[600] text-[20px]'>Description</h1>
        <p className='text-[15px] mt-1 text-justify'>{product.descripcion}</p>
      </div>
      <div className='text-black flex justify-around items-center lg:mt-32 mt-16 border-2 border-gray-200 w-[100%] h-[50px]'>
        <i className='bx bx-minus text-[22px] cursor-pointer' onClick={handleDecrease}></i>
        <div className='w-1 h-12 bg-gray-200'></div>
        <p className='font-[500] text-[15px]'>
          Quantity : <span>{quantity}</span>
        </p>
        <div className='w-1 h-12 bg-gray-200'></div>
        <i className='bx bx-plus text-[22px] cursor-pointer' onClick={handleIncrease}></i>
      </div>
      <div className='flex flex-col mt-16 gap-4'>
        <button className='text-white bg-orange h-[45px] text-[17px]' onClick={handleBuy}>Buy</button>
        <Link to='/'><button className='text-white lg:w-[660px] w-[320px] bg-orange h-[45px] text-[17px]'>Back</button></Link>
      </div>
    </div>
  );
};

export default Product;
