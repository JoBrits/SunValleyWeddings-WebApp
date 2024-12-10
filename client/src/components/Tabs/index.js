import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Tabs.module.scss";

const Tabs = ({
  type = "link",
  target = "self",
  tabs,
  justifyContent,
  alignItems,
  alignContent
}) => {
  const place = {
    justifyContent,
    alignItems,
    alignContent,
  };

  return (
    <nav style={place} className={classNames(styles["tabs"])}>
      {tabs.map((tab, index) =>
        type === "link" ? (
          <Link
            className={classNames(styles["tabs-tab"])}
            key={index}
            target={target}
            to={`/${tab.link}`}
          >
            {tab.label}
          </Link>
        ) : (
          <a
            className={classNames(styles["tabs-tab"])}
            key={index}
            href={`#${tab.link}`}
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById(tab.link);
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {tab.label}
          </a>
        )
      )}
    </nav>
  );
};

export default Tabs;
