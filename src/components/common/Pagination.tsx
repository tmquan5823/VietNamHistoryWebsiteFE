import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 my-6">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 font-medium shadow-sm transition hover:bg-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
      >
        Trang trước
      </button>
      <span className="mx-2 text-base font-semibold text-[#D12827] select-none">
        Trang <span className="text-lg">{page}</span> /{" "}
        <span className="text-lg">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(page < totalPages ? page + 1 : page)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 font-medium shadow-sm transition hover:bg-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
      >
        Trang sau
      </button>
    </div>
  );
};

export default Pagination;
