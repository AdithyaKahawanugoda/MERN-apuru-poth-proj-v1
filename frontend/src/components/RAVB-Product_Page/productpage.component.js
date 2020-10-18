import React, { useEffect, useState } from "react";
import ProductInformation from "../RAVB-Product_Page/productinfo.component";
import Feedbacks from "./feedbacks.component";

const ProductPage = (props) => {
  const productId = props.match.params.id;
  return (
    <div className="background">
      <ProductInformation productId={productId} />
      <Feedbacks productId={productId} />
    </div>
  );
};

export default ProductPage;
