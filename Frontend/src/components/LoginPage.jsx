import { useState } from 'react';
import background from '../assets/smk.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowError(false);

    try {
      const response = await fetch('http://localhost:5000/api/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: name, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/upload');
      } else {
        setError(data.message);
        setShowError(true);

        setTimeout(() => {
          setShowError(false);
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong!', err);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <div
      className="w-[100%] h-[100vh] object-cover bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex justify-around items-center w-[450px] h-[480px] flex-col rounded-md text-orange bg-background lg:scale-100 scale-[70%]">
        <h1 className="font-poppins font-[600] text-[33px]">Login</h1>
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <input
            className="w-[350px] font-poppins h-[45px] rounded-sm pl-2 outline-none text-black text-[14px]"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-[350px] font-poppins h-[45px] rounded-sm pl-2 outline-none text-black text-[14px]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="text-white bg-orange block mx-auto font-poppins font-[600] text-[17px] px-7 py-2 rounded-3xl cursor-pointer
            hover:scale-90 hover:opacity-85 transition-all duration-300"
          >
            Login
          </button>
          <p className="text-white font-poppins text-[15px] mt-5">
            Not Admin?{' '}
            <Link to="/">
              <span className="underline">Back</span>
            </Link>
          </p>
          {showError && (
          <div
            className={`text-red-500 font-[600] font-poppins mt-3 mb-2 transition-all duration-500 ease-in-out animate-fadeInUp ${
              showError ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
