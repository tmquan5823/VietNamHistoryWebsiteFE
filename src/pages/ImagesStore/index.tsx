import React, { useState } from "react";
import { useImagesHook } from "@/hooks/imagesHook";
import { Image } from "@/dataHelper/images.dataHelper";
import PageContainer from "@/components/common/PageContainer";

const ImagesStore: React.FC = () => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const { data, isLoading, error } = useImagesHook.getImages(sort);
  const images: Image[] = data?.data ?? [];
  const { mutate: deleteImageMutate, isPending: isDeleting } =
    useImagesHook.deleteImage();
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<Image | null>(null);
  const [showRestored, setShowRestored] = useState(true);

  const handleDeleteImage = (id: string) => {
    deleteImageMutate(id, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleOpenModal = (img: Image) => {
    setSelected(img);
    setShowRestored(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
  };

  return (
    <PageContainer title="Bộ sưu tập ảnh">
      <div className="w-full mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            className="ml-4 flex items-center gap-1 px-3 py-1.5 rounded bg-[#FDDAA7] text-[#5D4037] border border-[#5D4037] hover:bg-[#5D4037] hover:text-[#FDDAA7] transition-colors text-sm font-semibold shadow"
            onClick={() =>
              setSort((prev) => (prev === "desc" ? "asc" : "desc"))
            }
            title={sort === "desc" ? "Mới nhất trước" : "Cũ nhất trước"}
          >
            {sort === "desc" ? (
              // icon: sort descending
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h4"
                />
              </svg>
            ) : (
              // icon: sort ascending
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 18h16M4 12h8m-8-6h4"
                />
              </svg>
            )}
            {sort === "desc" ? "Mới nhất" : "Cũ nhất"}
          </button>
        </div>
        {isLoading && (
          <div className="text-center text-gray-500">Đang tải...</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            Lỗi khi tải ảnh:{" "}
            {error instanceof Error ? error.message : String(error)}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.length > 0
            ? images.map((img) => (
                <div
                  key={img.id}
                  className="cursor-pointer group"
                  onClick={() => handleOpenModal(img)}
                >
                  <img
                    src={img.restored}
                    alt="restored"
                    className="w-full h-40 object-cover rounded shadow border group-hover:scale-105 transition"
                  />
                  <div className="text-xs text-gray-400 mt-2 text-center">
                    {img.createdAt
                      ? new Date(img.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </div>
                </div>
              ))
            : !isLoading && (
                <div className="col-span-4 text-center text-gray-500">
                  Chưa có ảnh nào trong bộ sưu tập.
                </div>
              )}
        </div>

        {/* Modal */}
        {openModal && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={showRestored ? selected.restored : selected.original}
                  alt={showRestored ? "Ảnh phục chế" : "Ảnh gốc"}
                  className="max-w-xs max-h-[60vh] rounded border mb-4"
                />
                <div className="flex gap-4 mb-4">
                  <div className="inline-flex rounded-lg shadow overflow-hidden border border-orange-400">
                    <button
                      className={`px-2 py-1 focus:outline-none transition-all duration-150 text-lg
                      ${
                        showRestored
                          ? "bg-orange-500 text-white cursor-default"
                          : "bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600 border-r border-orange-400"
                      }
                    `}
                      style={{
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}
                      onClick={() => setShowRestored(true)}
                      disabled={showRestored}
                      title="Ảnh phục chế"
                    >
                      🎨
                    </button>
                    <button
                      className={`px-2 py-1 focus:outline-none transition-all duration-150 text-lg
                      ${
                        !showRestored
                          ? "bg-orange-500 text-white cursor-default"
                          : "bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600"
                      }
                    `}
                      style={{
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      }}
                      onClick={() => setShowRestored(false)}
                      disabled={!showRestored}
                      title="Ảnh gốc"
                    >
                      🖼️
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2 w-full justify-center">
                    {/* Nút tải ảnh */}
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md font-semibold text-[#5D4037] bg-[#FDDAA7] border border-[#5D4037] hover:bg-[#5D4037] hover:text-[#FDDAA7] transition-colors text-sm shadow-sm"
                      style={{ minWidth: 90 }}
                      onClick={async () => {
                        const url = showRestored
                          ? selected.restored
                          : selected.original;
                        const fileName = showRestored
                          ? `restored-${selected.id}.jpg`
                          : `original-${selected.id}.jpg`;
                        try {
                          const response = await fetch(url, { mode: "cors" });
                          const blob = await response.blob();
                          const blobUrl = window.URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = blobUrl;
                          link.download = fileName;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(blobUrl);
                        } catch (err) {
                          alert("Không thể tải ảnh. Vui lòng thử lại!");
                        }
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Tải ảnh
                    </button>
                    {/* Nút xóa ảnh */}
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md font-semibold text-white bg-[#D12827] border border-[#D12827] hover:bg-white hover:text-[#D12827] transition-colors text-sm shadow-sm"
                      style={{ minWidth: 90 }}
                      onClick={() => {
                        if (selected?.id) {
                          handleDeleteImage(selected.id);
                        }
                      }}
                      disabled={isDeleting}
                    >
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {isDeleting ? "Đang xóa..." : "Xóa ảnh"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ImagesStore;
