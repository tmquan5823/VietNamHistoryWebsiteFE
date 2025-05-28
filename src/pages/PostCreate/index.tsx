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
  getForumPostDraft,
  setForumPostDraft,
  removeForumPostDraft,
} from "@/utils/storage";

type PostFormType = z.infer<typeof postSchema>;

const PostCreate: React.FC = () => {
  const [postToForum, setPostToForum] = useState(true);
  const { data: topicsData } = useTopicHook.topicQuery();
  const topics = topicsData || [];

  // Lấy draft nếu có
  const forumPostDraft = getForumPostDraft();

  const form = useForm<PostFormType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: forumPostDraft?.title || "",
      content: forumPostDraft?.content || "",
      topic_id: forumPostDraft?.topic_id || [],
    },
  });

  const { mutate: createForumPost, isPending } =
    useForumPostHook.useCreateForumPost();

  const { mutateAsync: uploadImage } = useImageHook.uploadImage();

  // Lưu draft mỗi khi form thay đổi
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      setForumPostDraft({
        title: value.title,
        content: value.content,
        topic_id: value.topic_id,
      });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: PostFormType) => {
    try {
      createForumPost({
        ...data,
        status: postToForum ? ForumPostStatus.PENDING : ForumPostStatus.LOCAL,
      });
      removeForumPostDraft(); // Xóa draft khi tạo thành công
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Tạo bài viết thất bại");
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
    <PageContainer title="Tạo bài viết">
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
              {isPending ? "Đang tạo..." : "Tạo bài viết"}
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
};

export default PostCreate;
