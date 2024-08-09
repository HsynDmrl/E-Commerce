import { Route, Routes } from "react-router-dom";
import HomePage from "../page/HomePage/HomePage";
import Navi from "../component/Navi/navi";
import Purchase from "../page/PurchasePage/PurchasePage";
import ProductPage from "../page/ProductPage/ProductPage";
import ProfilePage from "../page/ProfilePage/ProfilePage";
import Footer from "../component/Footer/footer";
import ApiPage from "../page/ApiPage/ApiPage";

const AppRoutes = () => {
    return (
        <>
        <Navi />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/api' element={<ApiPage />} />
            <Route path="*">"404 Not Found"</Route>
        </Routes>
        <Footer />
        </>
    );
};

export default AppRoutes;
