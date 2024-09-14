import logo from '../assets/icon.png';

const Welcome = () => {
    return (
      <div className="h-[100vh] w-[100%] bg-white flex flex-col justify-center items-center">
        <div className="flex lg:flex-row flex-col-reverse justify-around items-center lg:gap-[120px] gap-[30px] lg:mt-10 mt-32">
          <div className="font-poppins">
            <h1 className="font-[600] lg:text-[40px] text-[34px] text-orange lg:text-start text-center">Sticray</h1>
            <p className="lg:w-[580px] font-[500] pt-2 text-[17px] lg:text-start text-justify lg:px-0 px-9">Sticray adalah toko yang menyediakan stiker dan layanan sablon baju custom dengan desain unik dan kualitas terbaik. Kami hadir untuk membantu Anda mengekspresikan kreativitas melalui produk-produk yang personal dan tahan lama.</p>
            <a href="#shop"><button className="bg-orange text-[14px] font-[600] text-white px-5 py-3 cursor-pointer rounded-2xl mt-12 block lg:mx-0 mx-auto
            hover:scale-90 hover:opacity-90 transition-all duration-300">Get Started</button></a>
          </div>
          <img src={logo} alt="" className="lg:w-[400px] w-[200px] h-auto"/>
        </div>
      </div>
    );
  }
  
  export default Welcome;
  