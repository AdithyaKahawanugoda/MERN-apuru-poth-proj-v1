import React from "react";
import FadeIn from 'react-fade-in'

const ProductImage = ({ coverImage }) => {
  return (
    <div>
      <FadeIn transitionDuration={800}>
        <div style={{ paddingLeft: 20, paddingTop: 15 }}>
          <img
            src={coverImage}
            alt="Product Image"
            className="border-top border-bottom border-right border-left shadow mb-5 bg-white rounded image-size"
          />
        </div>
      </FadeIn>
    </div>
  );
};

export default ProductImage;
