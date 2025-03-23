import axios from "axios";

const API_BASE_URL = "https://nodeproject-production-dc03.up.railway.app";

const sendMessage = async ({ user, action, info }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages`, {
      user,
      action,
      info,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export default sendMessage;
