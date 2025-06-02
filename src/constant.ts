export const enum ROUTERS {
  // LOGIN = "login",
  // INITIAL_PWD = "initial_password",
  // INITIAL_PWD_SUCCESS = "initial_password_success",

  DEFAULT = "/",
  LOGIN = "/login",
  HOME = "/home",
  IMAGE_RESTORATION = "/image-restoration",
  HISTORY_DOCUMENT = "/history-document",
  
  FORUM = "/forum",
  MY_POST = "/my-post", 
  MY_POST_DETAIL = "/my-post/:id",
  FORUM_CREATE = "/forum/post-create",
  FORUM_UPDATE = "/forum/post-update/:id",
  FORUM_DETAIL = "/forum/:id",
  SAVED_POSTS = "/saved-posts",
  
  HISTORY_DOCUMENT_DETAIL = "/history-document/:id",

  QUIZ = "/quiz",
  QUIZ_PLAY = "/quiz/:id",

  MY_QUIZ = "/my-quiz",
  MY_QUIZ_DETAIL = "/my-quiz/:id",
  QUIZ_CREATE = "/quiz-create",
  QUIZ_UPDATE = "/quiz-update/:id",

  PROFILE = "/profile",

  NOTIFICATION = "/notification",

  BLANK_PAGE = "admin/blank_page",
  UNAUTHORIZED = "admin/403_unauthorized"
}

export const enum STORAGE_VAR {
  ACCESS_TOKEN = "access_token",
}

export const enum ROLE {
  ADMIN = "admin",
}

export const enum ROLE_ID {
  SUPER_USER = 5,
}

export const MAX_FILE_SIZE = 1024 * 1024; // 1MB
export const ALLOWED_TYPES = ["text/csv"];

export const MAX_LENGTH_INPUT = 255;

export const regexPassword =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const regexUsername = /^[a-zA-Z0-9_]+$/;


export const statusMap: Record<string, string> = {
  approved: "Đã duyệt",
  publish: "Đã công khai",
  unpublish: "Chưa công khai",
  pending: "Chờ duyệt",
};

export const statusMapForum: Record<string, string> = {
  approved: "Đã duyệt",
  pending: "Chờ duyệt",
  rejected: "Đã từ chối",
  inactive: "Đã tắt",
  local: "Bản nháp",
  needs_review: "Cần kiểm duyệt",
};

//Color
export const COLORS = {
  PRIMARY: "#000000",
  SECONDARY: "#000000",
  TERTIARY: "#000000",
  RED: "#D12827",
  BROWN: "#5D4037",
  WHITE: "#FFFFFF",
  YELLOW: "#FDDAA7"
};
