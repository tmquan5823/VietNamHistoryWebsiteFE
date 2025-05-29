import { ForumPost } from "@/dataHelper/forumPost.dataHelper";
import React from "react";
import PostItem from "./PostItem";

interface PostListProps {
  posts: ForumPost[];
  currentUserId?: number;
}

const PostList: React.FC<PostListProps> = ({ posts, currentUserId }) => {
  return (
    <div className="grid gap-4">
      {posts &&
        posts.map((post) => (
          <PostItem key={post.id} post={post} currentUserId={currentUserId} />
        ))}
    </div>
  );
};

export default PostList;
