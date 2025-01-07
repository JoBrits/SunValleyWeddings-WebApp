import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./Navbar.module.scss";

// Components
import Logo from "../Logo";

// Hooks
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";


const NavbarNavTabs = ({ tabs, isActive, activeTab, target }) => {
  return (
    <nav
      className={classNames(styles["navbar-home"], {
        [styles["navbar-home--active"]]: isActive,
      })}
    >
      {tabs.map((tab, index) => (
        <Link
          className={
            activeTab === tab.link
              ? classNames(styles["navbar-nav-tab--active"])
              : classNames(styles["navbar-nav-tab"])
          }
          key={index}
          to={tab.link}
          target={tab.target}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};

const NavbarLogin = ({ activeTab }) => {
  return (
    <div className={classNames(styles["navbar-login"])}>
      <Link
        className={
          activeTab === "/SignUp"
            ? classNames(styles["navbar-nav-tab--active"])
            : classNames(styles["navbar-nav-tab"])
        }
        to={`/SignUp`}
      >
        Sign Up
      </Link>
      <div className={classNames(styles["navbar-login-tab"])}>|</div>
      <Link
        className={
          activeTab === "/SignIn"
            ? classNames(styles["navbar-nav-tab--active"])
            : classNames(styles["navbar-nav-tab"])
        }
        to={`/SignIn`}
      >
        Sign In
      </Link>
    </div>
  );
};

const NavbarLogout = ({ user, onLogout }) => {
  return (
    <div className={classNames(styles["navbar-login"])}>
      <span>{user.name}</span>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  // From Hook
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const location = useLocation(); // React Router hook to get the current location

  useEffect(() => {
    // Update the active tab whenever the URL changes
    setActiveTab(location.pathname);
  }, [location.pathname]); // Dependency array ensures this runs only when the path changes

  useEffect(() => {
    const handleScroll = () => {
      // Activate when scrolled more than 100px
      setIsActive(window.scrollY > 100);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={classNames(styles["navbar"], styles["navbar"], {
        [styles["navbar--active"]]: isActive,
      })}
    >
      <div className={classNames(styles["navbar-content"])}>
        <Logo section={"Wedding and Golf Venue"} headingMainMargin={0} />
        
        {/* Conditional to check whether user is logged in */}
        {user && (
        <>
          <NavbarNavTabs
            isActive={isActive}
            activeTab={activeTab}
            tabs={[
              {
                label: "Overview",
                link: "/Home",
              },
              {
                label: "Booking Management",
                link: "/Weddings",
              },
              {
                label: "RSVP Tracking",
                ink: "/Home",
              },
              {
                label: "Guest Profiles",
                ink: "/Home",
              },
              {
                label: "Event Management",
                ink: "/Home",
              },
            ]}
          />
          <NavbarLogout user={user} onLogout={handleClick} />
        </>
        )}
        
        {/* Conditional to check whether user is logged out */}
        {!user && (
        <>
          <NavbarNavTabs
            isActive={isActive}
            activeTab={activeTab}
            tabs={[
              {
                label: "Home",
                link: "/Home",
              },
              {
                label: "Weddings",
                link: "/Weddings",
              },
              {
                label: "Golf",
                target: "blank",
                link: "https://sunvalleyweddingandgolfvenue.co.za/sun-valley-golf",
              },
              {
                label: "Testimonials",
                target: "blank",
                link: "https://sunvalleyweddingandgolfvenue.co.za/testimonials",
              },
              {
                label: "Contact Us",
                target: "blank",
                link: "https://sunvalleyweddingandgolfvenue.co.za/contact-us",
              },
            ]}
          />
        <NavbarLogin activeTab={activeTab} />
        </>
        )}
        
        
      </div>
    </div>
  );
};

export default Navbar;
