export interface Document {
    id: number;
    image: string;
    title: string;
    start_year: number;
    end_year: number;
    description: string;
}

export interface Post {
    id: number;
    title: string;
    createdAt: string;
    creator: User;
}

export interface Quiz {
    id: number;
    image: string;
    title: string;
    description: string;
    created_by: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    image_public_id: string;
    playerCount: string;
    leaderboard: Leaderboard[];
}

export interface Leaderboard {
    id: number;
    user: User;
    score: number;
}

export interface User {
    id: number;
    fullname: string;
    email: string;
    avatar: string
}

export interface HomepageData {
    documents: Document[];
    latestPosts: Post[];
    quizSetMostPlayers: Quiz[];
    userCounts: number;
}