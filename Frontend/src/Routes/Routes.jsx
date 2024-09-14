import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../views/Home.jsx';
import LoginPage from '../components/LoginPage.jsx';
import Upload from '../views/Upload.jsx';
import ProductDetail from '../views/ProductDetail.jsx';

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path="/product/:id" element={<ProductDetail/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router