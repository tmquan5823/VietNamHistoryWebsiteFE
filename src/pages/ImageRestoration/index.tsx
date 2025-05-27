import React from "react";
import PageContainer from "../../components/common/PageContainer";
import ImageRestorationForm from "./components/ImageRestorationForm";

const ImageRestoration: React.FC = () => {
  return (
    <PageContainer
      title="Phục chế ảnh"
      info="Khôi phục lại những hình ảnh lịch sử quý giá với công nghệ trí tuệ nhân tạo"
    >
      <ImageRestorationForm />
    </PageContainer>
  );
};

export default ImageRestoration;
