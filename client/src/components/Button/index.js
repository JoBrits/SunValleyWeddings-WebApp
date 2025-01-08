import { Link } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./Button.module.scss";

const Button = ({
  label,
  type,
  sectionLink,
  justifyContent,
  alignItems,
  alignContent,
  to,
}) => {
  const place = {
    justifyContent: `${justifyContent}`,
    alignItems: `${alignItems}`,
    alignContent: `${alignContent}`,
  };

  // Conditional to link to page-section using id or normal link
  if (type === "scroll") {
    return (
      <a
        className={classNames(styles["button"])}
        href={`#${sectionLink}`}
        onClick={(e) => {
          e.preventDefault();
          const section = document.getElementById(sectionLink);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {label}
      </a>
    );
  } else if (type === "link") {
    return (
      <Link
        className={classNames(styles["button"])}
        to={to} // Navigate to the specified route
        style={place}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <button style={place} className={classNames(styles["button"])}>
        {label}
      </button>
    );
  }
};

export default Button;