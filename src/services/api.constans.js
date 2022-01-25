

//export const BASE_URL = "http://localhost:5000/iskoolu";

export const API_BASE_CONTEXT = "/api/v1";
export const API_VERSION = "/v1";
export const AUTH = "/auth";

  // export const BASE_URL_LOGIN = "http://localhost:8000/iskoolu";


 // export const BASE_URL = "http://192.168.0.192:5000/iskoolu/api/v1";
//  export const BASE_URL_LOGIN = "http://192.168.0.192:5000/iskoolu";

  export const BASE_URL = "http://192.168.0.134:5000/iskoolu/api/v1";
  export const BASE_URL_LOGIN = "http://192.168.0.134:5000/iskoolu";


//  export const BASE_URL = "http://localhost:8000/iskoolu/api/v1";

 export const INDIV_POST_REGISTER = `${AUTH}/reg-ind-step1`;
export const API_POST_LOGIN = `${AUTH}/login`;
export const INDIV_POST_ADDINFO = `${API_BASE_CONTEXT}/reg-ind-step2`;
export const INSTI_POST_REGISTER = `${AUTH}/reg-inst-step1`;
export const INSTI_POST_ADDINFO = `${API_BASE_CONTEXT}/reg-inst-step2`;
export const POST_FORGETPASSWORD = `${AUTH}/forgot-pwd`;
export const POST_UPDATEPASSWORD= `${API_BASE_CONTEXT}/update-pwd`;
export const POST_UPDATE_EMAIL= `${API_BASE_CONTEXT}/update-email`;
export const POST_UPDATE_IMAGE = `${API_BASE_CONTEXT}/upload`;
export const POST_UPDATE_MOBILE = `${API_BASE_CONTEXT}/update-mobile`;


export const OTP_POST_EMAIL = `${BASE_URL}/get-otp`;
export const OTP_POST_VERIFY_EMAIL = `${BASE_URL}/valid-otp`;
export const COURSE_POST_ADD_COURSE= `${BASE_URL}/add-course`;
export const GET_USER_DETAILS= `${API_BASE_CONTEXT}/isk-user`;
export const POST_SUBJECT_SEARCH= `${API_BASE_CONTEXT}/sub-search`;
export const POST_SUGGESTBOX_SEARCH= `${API_BASE_CONTEXT}/sub-search/subject/`;
export const POST_TOP_INSTI= `${API_BASE_CONTEXT}/getTopInst`;
export const GET_ENROLL_COURSE= `${API_BASE_CONTEXT}/getUserEnrolledCourses`;
export const GET_TEACHING_COURSE= `${API_BASE_CONTEXT}/getUserTeachCourses`;
export const POST_ENROLL_COURSE= `${API_BASE_CONTEXT}/enroll-course`;
export const POST_CHECKOUT_ENROLL= `${API_BASE_CONTEXT}/checkout`;
export const POST_VERIFY_CHECKOUT= `${API_BASE_CONTEXT}/verify-update-checkout`;




export const CLIENT_ID_GMAIL = '647278679470-cpq2kp74peu388ppmv7sap37j89q3tna.apps.googleusercontent.com';
export const SECRET_KEY = '6Ktk3pC4m4fbFyQAVlV70CgS';
export const PINCODE_API = "https://api.postalpincode.in/pincode/";
export const SEND_OTP = "https://api.msg91.com/api/v5/otp";
export const VERIFY_OTP = "https://api.msg91.com/api/v5/otp/verify";

export const OAUTH2_REDIRECT_URI = "http://localhost:8000/oauth2/redirect";

export const GOOGLE_AUTH_URL =
BASE_URL_LOGIN+"/oauth2/authorize/google?redirect_uri="+OAUTH2_REDIRECT_URI;