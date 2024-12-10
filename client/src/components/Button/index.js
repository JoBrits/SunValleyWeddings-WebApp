import { Link } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({label, justifyContent, alignItems, alignContent}) => {

  const place = {
    justifyContent: `${justifyContent}`,
    alignItems: `${alignItems}`,
    alignContent: `${alignContent}`,
  }
  
  return (
    <button style={place} className={classNames(styles["button"])}>
      {label}
   </button>
  );
};

export default Button;


