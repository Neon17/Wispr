// API Configuration
// This file centralizes all API URL configurations

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const config = {
  API_URL,
  SOCKET_URL,
  
  // API Endpoints
  endpoints: {
    // Auth
    login: `${API_URL}/api/v1/users/login`,
    signup: `${API_URL}/api/v1/users/signup`,
    
    // Profile
    profile: `${API_URL}/api/v1/users/profile`,
    updateProfile: `${API_URL}/api/v1/users/updateProfile`,
    uploadProfilePicture: `${API_URL}/api/v1/users/uploadProfilePicture`,
    
    // Friends
    getAllFriends: `${API_URL}/api/v1/users/getAllFriends`,
    addFriend: `${API_URL}/api/v1/users/addFriend`,
    fetchAllUsersExceptFriends: `${API_URL}/api/v1/users/fetchAllUsersExceptFriends`,
    fetchAllUnknownUsers: `${API_URL}/api/v1/users/fetchAllUnknownUsers`,
    
    // Groups
    showAllGroupList: `${API_URL}/api/v1/users/showAllGroupList`,
    addGroup: `${API_URL}/api/v1/users/addGroup`,
    
    // Messages
    getAllMessages: `${API_URL}/api/v1/users/getAllMessages`,
    sendMessage: `${API_URL}/api/v1/users/sendMessage`,
  },
  
  // Helper function to get profile image URL
  getProfileImageUrl: (imageName) => `${API_URL}/profileImages/${imageName}`,
  getDefaultProfileImageUrl: (gender) => `${API_URL}/profileImages/defaultImages/${gender}Profile.png`,
};

export default config;
