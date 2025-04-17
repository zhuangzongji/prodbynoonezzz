import { useParams } from 'react-router'
import { Helmet } from "react-helmet-async"
import Header from '../components/Header'
import Footer from '../components/Footer/index'
import ProductDetail from '../components/ProductDetail'
import products from '../json/beats.json'

function Product() {
    const { productId } = useParams();
    const product = products.find(
        (x) => x.id === productId
    )

    return (
        <div data-theme="luxury"  className="container mx-auto main-layout ">
            <Header
                title="← HOME"
                slogan="detail"
            />
            <ProductDetail product={product} className="content" />
            <Footer className="footer" />
        </div>
    )
}

export default Product