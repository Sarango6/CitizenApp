import { createContext, useState } from "react";

export const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    photo: null,
  });

  const addIssue = (issue) => {
    setIssues((prev) => [...prev, { ...issue, user: currentUser }]);
  };

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue, currentUser, updateUser }}>
      {children}
    </IssuesContext.Provider>
  );
};
