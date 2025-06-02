import React from "react";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import QuizSection from "./components/QuizSection";
import ForumSection from "./components/ForumSection";
import { useDashboardHook } from "@/hooks/useDashboardHook";

const Home: React.FC = () => {
  const { data } = useDashboardHook.useHomepageData();
  const quizArr = data?.data.quizSetMostPlayers ?? [];
  const quiz = Array.isArray(quizArr) ? quizArr[0] ?? null : quizArr;
  const documents = data?.data.documents ?? [];
  const post = data?.data.latestPosts ?? [];
  const usersCount = data?.data.userCounts ?? 0;
  return (
    <div className="min-h-screen bg-[#fff]">
      <HeroSection />
      <TimelineSection data={documents} />
      <ForumSection data={post} usersCount={usersCount} />
      <QuizSection data={quiz} />
    </div>
  );
};

export default Home;
