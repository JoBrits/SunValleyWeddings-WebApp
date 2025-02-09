import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./Navbar.module.scss";

// Components
import Logo from "../Logo";

// Hooks
import { useLogout } from "../../hooks/useLogout";

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

const NavbarLogin = ({ setIsActive, activeTab }) => {
  setIsActive(window.scrollY > 100);
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

const NavbarLogout = ({ setIsActive, user, onLogout }) => {
  setIsActive(true)
  return (
    <div className={classNames(styles["navbar-login"])}>
      <span className={classNames(styles["navbar-nav-tab"])}>
        Welcome back {user.name}
      </span>
      <div className={classNames(styles["navbar-login-tab"])}>|</div>
      <Link onClick={onLogout} className={classNames(styles["navbar-nav-tab"])}>
        Logout
      </Link>
    </div>
  );
};

const Navbar = ({ user }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  console.log(user);

  // From Hook
  const { logout } = useLogout();

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
            {/* Conditional to check whether admin logged in */}
            {user.role === "admin" && (
              <>
                <NavbarNavTabs
                  isActive={isActive}
                  activeTab={activeTab}
                  tabs={[
                    {
                      label: "Overview",
                      link: "/",
                    },
                    {
                      label: "Booking Management",
                      link: "/admin/bookings",
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
                <NavbarLogout setIsActive={setIsActive} user={user} onLogout={handleClick} />
              </>
            )}
            {/* Conditional to check whether admin logged in */}
            {user.role === "user" && (
              <>
                <NavbarNavTabs
                  isActive={true}
                  activeTab={activeTab}
                  tabs={[
                    {
                      label: "Overview",
                      link: "/",
                    },
                    {
                      label: "My Details",
                      link: "/Weddings",
                    },
                    {
                      label: "RSVP's",
                      ink: "/Home",
                    },
                    {
                      label: "Catering",
                      ink: "/Home",
                    },
                    {
                      label: "Schedule",
                      ink: "/Home",
                    },
                  ]}
                />
                <NavbarLogout setIsActive={setIsActive} user={user} onLogout={handleClick} />
              </>
            )}
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
                  link: "/",
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
            <NavbarLogin setIsActive={setIsActive} activeTab={activeTab} />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
