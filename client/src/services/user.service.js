import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/users/";
const API_USER_URL = "http://localhost:8080/files/";
const API_LIKE_URL = "http://localhost:8080/";

const follow = (userId) => {
  return axios.post(API_LIKE_URL + "follow/" + userId + "/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()})
}

const unfollow = (userId) => {
  return axios.delete(API_LIKE_URL + "follow/" + userId + "/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()})
}

const getFollowers = () => {
  return axios.get(API_LIKE_URL + "follow/followers/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()})
}

const getFollowing = () => {
  return axios.get(API_LIKE_URL + "follow/following/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()})
}

const getFollowersCount = (userId) => {
  return axios.get(API_LIKE_URL + "follow/follower_count/" + userId, {headers: authHeader()})
}

const getFollowingCount = (userId) => {
  return axios.get(API_LIKE_URL + "follow/following_count/" + userId, {headers: authHeader()})
}

const getComment = (commentId) => {
  return axios.get(API_LIKE_URL + "comments/comment/" + commentId, {headers: authHeader()})
}

const getComments = (postId) => {
  return axios.get(API_LIKE_URL + "comments/" + postId, {headers: authHeader()})
}

const saveComment = (postId, formData) => {
  return axios.post(API_LIKE_URL + "comments/" + postId, formData, {headers: authHeader()})
}

const deleteComment = (commentId) => {
  return axios.delete(API_LIKE_URL + "comments/" + commentId, {headers: authHeader()})
}

const isPostLiked = (postId) => {
  return axios.get(API_LIKE_URL + "likes/" + postId + "/" + JSON.parse(localStorage.getItem("user"))["id"], { headers: authHeader() });
}

const saveLike = (postId) => {
  return axios.post(API_LIKE_URL + "likes/" + postId, "like", { headers: authHeader() });
}

const deleteLike = (postId) => {
  return axios.delete(API_LIKE_URL + "likes/" + postId + "/" + JSON.parse(localStorage.getItem("user"))["id"], {headers: authHeader()});
}

const countLikes = (postId) => {
  return axios.get(API_LIKE_URL + "likes/" + postId, {headers: authHeader()} )
}

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getTimeline = () => {
  return axios.get("http://localhost:8080/file/", { headers: authHeader() });
};

const getUserBoard = () => {
  if(JSON.parse(localStorage.getItem("user"))["username"]){
    return axios.get(API_USER_URL + JSON.parse(localStorage.getItem("user"))["username"], { headers: authHeader() });
  }else{
    localStorage.setItem("username", "GUEST");
    return "GUEST";
  }
};

const getFile = (url) => {
  return axios.get(url, { headers: authHeader() });
}

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getFile,
  getTimeline,
  saveLike,
  deleteLike,
  countLikes,
  isPostLiked,
  getComment,
  getComments,
  saveComment,
  deleteComment,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  getFollowersCount,
  getFollowingCount
};

export default UserService;