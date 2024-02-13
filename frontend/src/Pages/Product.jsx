import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/breadcrums/Breadcrum';
import ProductDispaly from '../Components/ProductDispaly/ProductDispaly';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

export default function Product() {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find( (e)=> e.id === Number(productId) )

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDispaly product={product}/>
      <Description/>
      <RelatedProducts />
    </div>
  )
  
}
