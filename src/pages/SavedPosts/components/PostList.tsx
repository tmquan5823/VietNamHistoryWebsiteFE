import { ForumPost } from "@/dataHelper/forumPost.dataHelper";
import React from "react";
import PostItem from "./PostItem";

interface PostListProps {
  posts: ForumPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="grid gap-4">
      {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
