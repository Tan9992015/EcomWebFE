import ProductPage from "../pages/ProductPage/ProductPage"
import OrderPage from "../pages/OrderPage/OrderPage"
import HomePage from "../pages/HomePage/HomePage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ProductsDetailPage from "../pages/ProductsDetailPage/ProducsDetailPage"
import ProfilePage from "../pages/ProflePage/ProfilePage"
import AdminPage from "../pages/AdminPage/AdminPage"
 export const routes = [
    {
        path: '/order',
        page : OrderPage,
        isShowHeader: true
    },
    {
        path: '/',
        page : HomePage,
        isShowHeader: true
    },
    {
        path: '/product',
        page : ProductPage,
        isShowHeader: true
    },
    {
        path: '/type',
        page : TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page : SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page : SignUpPage,
        isShowHeader: false 
    },
    {
        path: '/products-detail/:id',
        page : ProductsDetailPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page :ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page :AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
]