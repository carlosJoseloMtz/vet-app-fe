const KEY_TOKEN = 'app-token';
const KEY_USER_INFO = 'user-info';

const getCurrentUser = () => localStorage.getItem(KEY_USER_INFO);

const registerSession = ({ token, userInfo }) => {
  localStorage.setItem(KEY_TOKEN, token);
  localStorage.setItem(KEY_USER_INFO, userInfo);
};

const logout = async () => {
  // TODO: call the backend service to invalidate the token
  localStorage.clear();
};

export { getCurrentUser, registerSession, logout };
