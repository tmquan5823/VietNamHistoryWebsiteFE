import React, { useState } from 'react';
import SectionContainer from '../../components/common/SectionContainer';

const ImageRestoration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log(selectedImage)
      // TODO: Call API to restore image
      // For now, just display the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestoredImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(file);
      // TODO: Call API to restore image
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestoredImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <SectionContainer
      title="Phục chế ảnh"
      subtitle="Khôi phục lại những hình ảnh lịch sử quý giá với công nghệ trí tuệ nhân tạo"
      className="bg-white"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-center text-gray-600 mb-6">Tải ảnh lên</h3>
          
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => document.getElementById('imageInput')?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Upload Icon */}
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            
            <p className="text-gray-700 mb-2">Bấm để chọn ảnh hoặc kéo thả vào đây</p>
            <p className="text-sm text-gray-500">PNG, JPG hoặc GIF (tối đa 5MB)</p>
            
            <input
              type="file"
              id="imageInput"
              className="hidden"
              accept="image/png,image/jpeg,image/gif"
              onChange={handleImageUpload}
            />
          </div>

          {/* Restored Image Preview */}
          {restoredImage && (
            <div className="mt-8">
              <h3 className="text-center text-gray-600 mb-4">Ảnh đã được phục chế</h3>
              <div className="relative">
                <img
                  src={restoredImage}
                  alt="Restored"
                  className="w-full rounded-lg shadow-md"
                />
                <div className="mt-4 flex justify-between items-center">
                  <button className="flex items-center text-orange-500 hover:text-orange-600 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Chia sẻ lên diễn đàn
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-gray-800 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Tải ảnh về máy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default ImageRestoration; 