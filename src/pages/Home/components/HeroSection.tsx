import React from "react";
import HeroImage from "../../../components/common/HeroImage";

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-[500px] w-full bg-[#FDDAA7]">
      {/* Background image on the right */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
        <div
          className={`absolute inset-0 bg-[url('/images/behind-hero.webp')] bg-cover bg-right [transform:rotateY(180deg)] opacity-50 md:opacity-100`}
        ></div>
      </div>

      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-4 relative">
        {/* Left content */}
        <div className="w-full md:w-[35%] flex flex-col items-start justify-center -mt-25 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5D4137] mb-4">
            Khám phá lịch sử
            <br />
            <span className="text-[#D12827]">Việt Nam</span>
          </h1>
          <p className="text-[#5D4137] text-base sm:text-lg mb-6 md:mb-8">
            Hành trình 4000 năm lịch sử hào hùng từ thời Hùng Vương đến hiện đại
          </p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <button className="border-2 border-[#D12827] bg-[#D12827] text-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-[#D12827]/90 transition font-bold rounded-3xl">
              Khám phá lịch sử
            </button>
            <button className="border-2 border-[#D12827] text-[#D12827] px-4 sm:px-6 py-2 sm:py-3 rounded-3xl font-bold">
              Phục chế ảnh
            </button>
          </div>
        </div>

        {/* Bottom HeroImage */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block">
          <HeroImage
            containerWidth="450px"
            containerHeight="450px"
            flagWidth="70%"
            flagPosition={{
              top: "-7%",
              right: "33%",
            }}
            hasBorder={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
