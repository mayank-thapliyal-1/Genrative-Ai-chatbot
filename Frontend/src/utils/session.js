export const getSessionId = () => {
  let id = localStorage.getItem("chat_session");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session", id);
  }

  return id;
};
