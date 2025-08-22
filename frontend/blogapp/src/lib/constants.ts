export const FETCH_USER_DETAILS_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/info`
export const FETCH_POSTS_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/Posts`;
export const CREATE_POST_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/Posts`;
//export const POST_FALLBACK_IMAGE = "https://cdn.pixabay.com/photo/2015/09/23/22/56/dog-954520_1280.jpg";
export const POST_FALLBACK_IMAGE = "/fallbackimage.jpg";

export const POST_TITLE_MAX_LENGTH = 40;
export const POST_DESCRIPTION_MAX_LENGTH = 60;
export const POST_CONTENT_MAX_LENGTH = 4000;