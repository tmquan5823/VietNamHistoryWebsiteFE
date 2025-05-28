import React, { useState, useRef, useMemo } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTopicHook } from "@/hooks/useTopicHook";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postSchema } from "@/utils/schema";
import { ForumPostStatus } from "@/dataHelper/forumPost.dataHelper";
import { useForumPostHook } from "@/hooks/useForumPostHook";
import { Checkbox } from "@/components/ui/checkbox";
import BackButton from "@/components/ui/backButton";
import PageContainer from "@/components/common/PageContainer";
import { useImageHook } from "@/hooks/useImageHook";
import {
  getForumPostUpdateDraft,
  setForumPostUpdateDraft,
  removeForumPostUpdateDraft,
} from "@/utils/storage";
import { useParams } from "react-router-dom";

type PostFormType = z.infer<typeof postSchema>;

const PostUpdate: React.FC = () => {
  const { id } = useParams();
  const [postToForum, setPostToForum] = useState(true);
  const { data: topicsData } = useTopicHook.topicQuery();
  const topics = topicsData || [];

  const { data: forumPostData } = useForumPostHook.useGetPostById(Number(id));

  const forumPost = forumPostData?.data;
  const forumPostDraft = getForumPostUpdateDraft(id!);

  const form = useForm<PostFormType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: forumPostDraft?.title || "",
      content: forumPostDraft?.content || "",
      topic_id: forumPostDraft?.topic_id || [],
    },
  });

  const [hasReset, setHasReset] = useState(false);

  React.useEffect(() => {
    // Nếu KHÔNG có draft nhưng có dữ liệu từ server, thì lưu vào storage và reset form
    if (forumPost && !forumPostDraft) {
      const topicIds = forumPost.topics?.map((t: any) => t.id) || [];
      setForumPostUpdateDraft(id!, {
        title: forumPost.title,
        content: forumPost.content,
        topic_id: topicIds,
        updatedAt: forumPost.updatedAt,
        status: forumPost.status,
      });
      form.reset({
        title: forumPost.title,
        content: forumPost.content,
        topic_id: topicIds,
      });
    }

    // Trường hợp đã có draft nhưng draft cũ hơn server thì vẫn giữ logic cũ
    if (
      forumPostData &&
      forumPostDraft &&
      forumPost &&
      forumPostDraft.updatedAt !== forumPost.updatedAt &&
      !hasReset
    ) {
      const topicIds = forumPost.topics?.map((t: any) => t.id) || [];
      setForumPostUpdateDraft(id!, {
        title: forumPost.title,
        content: forumPost.content,
        topic_id: topicIds,
        updatedAt: forumPost.updatedAt,
        status: forumPost.status,
      });
      form.reset(
        {
          title: forumPost.title,
          content: forumPost.content,
          topic_id: topicIds,
        },
        { keepDirty: false }
      );
      setHasReset(true);
    }
  }, [forumPostData, forumPostDraft, id, form, forumPost, hasReset]);

  const { mutate: updateForumPost, isPending } =
    useForumPostHook.useUpdateForumPost(Number(id));

  const { mutateAsync: uploadImage } = useImageHook.uploadImage();

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      setForumPostUpdateDraft(id!, {
        title: value.title,
        content: value.content,
        topic_id: value.topic_id,
        updatedAt: forumPost?.updatedAt,
        status: forumPost?.status,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, id, forumPost]);

  const onSubmit = async (data: PostFormType) => {
    try {
      updateForumPost({
        id: id ? Number(id) : undefined,
        ...data,
        status: postToForum
          ? forumPostDraft?.status === "local"
            ? ForumPostStatus.PENDING
            : ForumPostStatus.LOCAL
          : forumPostDraft?.status,
      });
      removeForumPostUpdateDraft(id!);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Cập nhật bài viết thất bại");
    }
  };

  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await uploadImage(formData);
          const url = res?.data?.url;
          if (url) {
            const quill = quillRef.current?.getEditor?.();
            if (quill) {
              const range = quill.getSelection();
              quill.insertEmbed(range ? range.index : 0, "image", url);
              const html = quill.root.innerHTML;
              form.setValue("content", html, { shouldValidate: true });
            }
          }
        } catch (e) {
          toast.error("Tải ảnh thất bại");
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <PageContainer title="Cập nhật bài viết">
      <div className="bg-white p-6 rounded shadow w-full">
        <BackButton className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ color: "#5D4037" }}>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nhập tiêu đề bài viết" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="topic_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ color: "#5D4037" }}>
                    Chủ đề (tối đa 3)
                  </FormLabel>
                  <FormControl>
                    <ReactSelect
                      isMulti
                      options={topics.map((topic) => ({
                        value: topic.id,
                        label: topic.name,
                      }))}
                      value={topics
                        .filter((topic) => field.value.includes(topic.id))
                        .map((topic) => ({
                          value: topic.id,
                          label: topic.name,
                        }))}
                      onChange={(selected) => {
                        const ids = (selected as any[]).map(
                          (item) => item.value
                        );
                        if (ids.length <= 3) {
                          field.onChange(ids);
                        }
                      }}
                      closeMenuOnSelect={false}
                      placeholder="Chọn chủ đề..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ color: "#5D4037" }}>Nội dung</FormLabel>
                  <FormControl>
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-white"
                      placeholder="Nhập nội dung bài viết"
                      modules={modules}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="postToForum"
                checked={postToForum}
                onCheckedChange={(checked) => setPostToForum(checked === true)}
              />
              <label
                htmlFor="postToForum"
                className="text-sm"
                style={{ color: "#5D4037" }}
              >
                Đăng bài lên diễn đàn (cần duyệt)
              </label>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              style={{
                backgroundColor: "#5D4037",
                color: "#fff",
                borderColor: "#5D4037",
              }}
            >
              {isPending ? "Đang cập nhật..." : "Cập nhật bài viết"}
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
};

export default PostUpdate;
