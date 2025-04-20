import React from "react";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import QuizSection from "./components/QuizSection";
import ForumSection from "./components/ForumSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff]">
      <HeroSection />
      <TimelineSection />
      <ForumSection />
      <QuizSection />
    </div>
  );
};

export default Home;
