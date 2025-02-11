import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <nav className={classNames(styles["footer"])}>
      <div className={classNames(styles["footer-content"])}>
        <p>
          Copyright © 2025 Sun Valley Wedding and Golf Venue - All Rights
          Reserved.
        </p>
        <span className={classNames(styles["footer-content-links"])}>
          <p>Connect with us</p>
          {/* box icon icons */}
          <Link className={classNames(styles["footer-content-links-link"])} to="https://www.facebook.com/sunvalleyweddingvenue" target="blank">
            <i className="bx bxl-facebook-circle"></i>
          </Link>
          <Link className={classNames(styles["footer-content-links-link"])} to="https://www.instagram.com/sunvalley.wedding.golf.venue/" target="blank">
            <i className="bx bxl-instagram-alt"></i>
          </Link>
          <Link className={classNames(styles["footer-content-links-link"])} to="https://www.linkedin.com/company/sun-valley-wedding-and-golf-venue/" target="blank">
            <i className="bx bxl-linkedin-square"></i>
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Footer;
