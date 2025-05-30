import React, { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import { useProfileHook } from "@/hooks/useProfileHook";
import ReactSelect from "react-select";
import { useUserStore } from "@/store/useUserStore";
import type { Profile } from "@/dataHelper/profile.dataHelper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileUpdateSchema,
  ProfileUpdateType,
  changePasswordSchema,
  ChangePasswordType,
} from "@/utils/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Profile: React.FC = () => {
  const { data: profile, isLoading } = useProfileHook.profileQuery();
  const { mutate: updateProfile, isPending: isUpdating } =
    useProfileHook.updateProfileMutation();
  const { mutate: changePassword, isPending: isChanging } =
    useProfileHook.changePasswordMutation();
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);

  const profileForm = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullname: profile?.fullname || "",
      gender: (profile?.gender as "male" | "female" | "other") || "male",
      birthday: profile?.birthday?.slice(0, 10) || "",
    },
  });
  const passwordForm = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (profile) {
      profileForm.reset({
        fullname: profile.fullname,
        gender: profile.gender as "male" | "female" | "other",
        birthday: profile.birthday?.slice(0, 10),
      });
    }
  }, [profile, profileForm]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  const avatarUrl = avatarFile
    ? URL.createObjectURL(avatarFile)
    : profile?.avatar || "/default-avatar.png";

  if (isLoading) return <div>Đang lưu...</div>;

  return (
    <PageContainer>
      <div
        className="flex flex-col gap-8 w-full bg-white p-8 rounded-lg shadow"
        style={{ color: "#000000" }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#5D4037" }}>
          Thông tin cá nhân
        </h1>
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit((values) => {
              const formData = new FormData();
              formData.append("fullname", values.fullname);
              formData.append("gender", values.gender);
              formData.append("birthday", values.birthday);
              if (avatarFile) {
                formData.append("avatar", avatarFile);
              }
              updateProfile(formData, {
                onSuccess: (data: Profile) => {
                  updateUserInfo(data);
                },
              });
            })}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="relative group">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover border-4"
                  style={{
                    borderColor: "#5D4037",
                    background: "#FDDAA7",
                    transition: "box-shadow 0.2s",
                    boxShadow: "0 2px 12px #5d40371a",
                  }}
                />
                {/* Overlay khi hover */}
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-[#5D4037]/70 cursor-pointer"
                  style={{ color: "#FDDAA7", fontWeight: "bold", fontSize: 16 }}
                  onClick={() =>
                    !isUpdating &&
                    document.getElementById("avatar-input")?.click()
                  }
                >
                  Đổi ảnh
                </div>
              </div>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={isUpdating}
              />
            </div>
            <FormField
              control={profileForm.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Họ tên</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="input w-full p-2 border rounded"
                      style={{
                        borderColor: "#FDDAA7",
                        color: "#000",
                        background: "#FFF",
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Giới tính</FormLabel>
                  <FormControl>
                    <ReactSelect
                      options={genderOptions}
                      value={genderOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(option) =>
                        field.onChange(
                          option?.value as "male" | "female" | "other"
                        )
                      }
                      isDisabled={isUpdating}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderColor: "#FDDAA7",
                          background: "#FFF",
                          color: "#000",
                          minHeight: 40,
                          boxShadow: state.isFocused
                            ? "0 0 0 1px #FDDAA7"
                            : "none",
                          "&:hover": { borderColor: "#FDDAA7" },
                        }),
                        singleValue: (base) => ({ ...base, color: "#000" }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#FDDAA7"
                            : state.isFocused
                            ? "#FFF8E1"
                            : "#FFF",
                          color: "#5D4037",
                        }),
                        menu: (base) => ({
                          ...base,
                          background: "#FFF",
                          color: "#000",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#5D4037",
                        }),
                        indicatorSeparator: (base) => ({
                          ...base,
                          background: "#FDDAA7",
                        }),
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Ngày sinh</FormLabel>
                  <FormControl>
                    <input
                      type="date"
                      {...field}
                      className="input w-full p-2 border rounded"
                      style={{
                        borderColor: "#FDDAA7",
                        color: "#000",
                        background: "#FFF",
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="btn font-bold rounded p-2 mt-2"
              style={{ background: "#5D4037", color: "#FDDAA7" }}
              disabled={isUpdating}
            >
              {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        </Form>

        <hr style={{ borderColor: "#FDDAA7" }} />

        <h2 className="text-xl font-bold" style={{ color: "#5D4037" }}>
          Đổi mật khẩu
        </h2>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit((values) => {
              changePassword(values, {
                onSuccess: () => {
                  passwordForm.reset({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  });
                },
              });
            })}
            className="flex flex-col gap-4"
          >
            <FormField
              control={passwordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Mật khẩu cũ</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      {...field}
                      className="input w-full p-2 border rounded"
                      style={{
                        borderColor: "#FDDAA7",
                        color: "#000",
                        background: "#FFF",
                      }}
                      disabled={isChanging}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Mật khẩu mới</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      {...field}
                      className="input w-full p-2 border rounded"
                      style={{
                        borderColor: "#FDDAA7",
                        color: "#000",
                        background: "#FFF",
                      }}
                      disabled={isChanging}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Nhập lại mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      {...field}
                      className="input w-full p-2 border rounded"
                      style={{
                        borderColor: "#FDDAA7",
                        color: "#000",
                        background: "#FFF",
                      }}
                      disabled={isChanging}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="btn font-bold rounded p-2 mt-2"
              style={{ background: "#5D4037", color: "#FDDAA7" }}
              disabled={isChanging}
            >
              {isChanging ? "Đang đổi..." : "Đổi mật khẩu"}
            </button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
};

export default Profile;
