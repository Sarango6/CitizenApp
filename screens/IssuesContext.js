// screens/IssuesContext.js
import { createContext, useEffect, useState } from "react";

export const IssuesContext = createContext();

export function IssuesProvider({ children }) {
  const [issues, setIssues] = useState([]);

  // Add a new issue with reporter info
  const addIssue = (issue, reporter) => {
    setIssues([
      ...issues,
      {
        id: Date.now().toString(),
        status: "Pending",      // default status
        createdAt: new Date(),  // store creation date
        reporter,               // store reporter info { name, email, mobile }
        ...issue,
      },
    ]);
  };

  // Update status of an issue
  const updateIssueStatus = (id, newStatus) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  // Automatic escalation of pending issues older than 7 days
  useEffect(() => {
    const interval = setInterval(() => {
      setIssues(prev =>
        prev.map(issue => {
          if (issue.status === "Pending") {
            const diffDays = (new Date() - new Date(issue.createdAt)) / (1000 * 60 * 60 * 24);
            if (diffDays >= 7) {
              return { ...issue, status: "Escalated" };
            }
          }
          return issue;
        })
      );
    }, 1000 * 60 * 60); // check every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <IssuesContext.Provider value={{ issues, addIssue, updateIssueStatus }}>
      {children}
    </IssuesContext.Provider>
  );
}
