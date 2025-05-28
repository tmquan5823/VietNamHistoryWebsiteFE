import { ForumPost } from "@/dataHelper/forumPost.dataHelper";
import React from "react";
import PostItem from "./PostItem";

interface PostListProps {
  posts: ForumPost[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onCancel: (id: number) => void;
  onSubmit: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  onEdit,
  onDelete,
  onView,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="grid gap-4">
      {posts &&
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        ))}
    </div>
  );
};

export default PostList;
