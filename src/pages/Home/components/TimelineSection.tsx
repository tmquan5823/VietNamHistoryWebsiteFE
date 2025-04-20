import React, { useState, useEffect } from "react";
import SectionContainer from "../../../components/common/SectionContainer";

const timelineData = [
  {
    title: "Thời Hùng Vương",
    period: "2879 TCN - 258 TCN",
    description:
      "Thời kỳ các vua Hùng dựng nước Văn Lang, đặt nền móng cho dân tộc Việt Nam",
    image: import.meta.env.VITE_BASE_URL + "images/vietnam-history.jpg",
  },
  {
    title: "Thời Bắc thuộc",
    period: "111 TCN - 938",
    description:
      "Thời kỳ đất nước bị các triều đại phong kiến phương Bắc đô hộ",
    image: import.meta.env.VITE_BASE_URL + "images/vietnam-history.jpg",
  },
  {
    title: "Thời phong kiến độc lập",
    period: "938 - 1858",
    description:
      "Thời kỳ các triều đại phong kiến Việt Nam xây dựng và bảo vệ đất nước Thời kỳ các triều đại phong kiến Việt Nam xây dựng và bảo vệ đất nước Thời kỳ các triều đại phong kiến Việt Nam xây dựng và bảo vệ đất nước Thời kỳ các triều đại phong kiến Việt Nam xây dựng và bảo vệ đất nước ",
    image: import.meta.env.VITE_BASE_URL + "images/vietnam-history.jpg",
  },
  {
    title: "Thời cận hiện đại",
    period: "1858 - nay",
    description: "Thời kỳ đấu tranh giành độc lập và xây dựng đất nước",
    image: import.meta.env.VITE_BASE_URL + "images/vietnam-history.jpg",
  },
  {
    title: "Thời cận hiện đại 123",
    period: "1858 - nay",
    description: "Thời kỳ đấu tranh giành độc lập và xây dựng đất nước",
    image: import.meta.env.VITE_BASE_URL + "images/vietnam-history.jpg",
  },
];

const TimelineSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // sm
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        // lg
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? timelineData.length - itemsPerPage : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === timelineData.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const getVisibleItems = () => {
    const items = [...timelineData];
    const duplicatedItems = [...items, ...items];
    return duplicatedItems.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <SectionContainer
      title="Các thời kỳ lịch sử"
      subtitle="Hành trình lịch sử của Việt Nam trải qua nhiều thời kỳ với những dấu ấn đặc biệt, từ thời đại các vua Hùng đến thời kỳ hiện đại."
      className="bg-white"
    >
      {/* Timeline Cards */}
      <div className="relative max-w-full overflow-hidden">
        <div className="px-8 md:px-16">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#5D4137]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#5D4137]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Timeline Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {getVisibleItems().map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col transform transition-transform hover:scale-[1.02]"
              >
                <div className="h-48 sm:h-40 lg:h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-[#FFF6E9] flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-[#5D4137] mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.period}</p>
                    <p className="text-sm sm:text-base text-[#5D4137]/80 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <button className="text-[#D12827] font-medium hover:underline transition-colors">
                      Khám phá thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default TimelineSection;
