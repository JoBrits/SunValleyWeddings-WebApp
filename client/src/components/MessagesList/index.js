// Styles
import classNames from "classnames";
import styles from "./MessagesList.module.scss";

// Hooks
import useMessagesList from "../../hooks/useMessagesList";

const MessagesList = () => {
  
  const { messages, loading, error } = useMessagesList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classNames(styles["message-list-container"])}>
      <ul className={classNames(styles["message-list"])}>
      {messages.map((message) => {
          const createdAtDate = new Date(message.createdAt); // Convert to date
          const formattedCreatedDate = createdAtDate
            ? createdAtDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Invalid Date"; // Fallback if date is invalid

          return ( 
            <li key={message._id} className={classNames(styles["message-list-item"])}>
              <div className={classNames(styles["message-list-request"])}>
                <p><strong>{message.name}</strong></p>
                <span className={classNames(styles["message-list-received"])}>{formattedCreatedDate}</span>
              </div>
              <p className={classNames(styles["message-list-text"])}>{message.message}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessagesList;
