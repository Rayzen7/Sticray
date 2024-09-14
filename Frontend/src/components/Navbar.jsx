import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-[11vh] w-[100%] bg-white fixed z-10 flex flex-col justify-center shadow-lg">
        <div className="flex justify-between">
            <h1 className="font-poppins text-orange font-[600] lg:text-[27px] text-[24px] lg:pl-10 pl-6">Sticray</h1>
            <Link to="/login"><button className="lg:mr-10 mr-6 text-white lg:px-7 px-5 lg:text-[17px] text-[14px] font-[600] cursor-pointer py-2 bg-orange rounded-xl">Login</button></Link>
        </div>
    </div>
  )
}

export default Navbar