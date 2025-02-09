// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import classNames from "classnames";
import styles from "./DashboardSideMenu.module.scss";

const DashboardSideMenuSection = ({ heading, children }) => {
  return (
    <div className="dashboard-menu-section">
      <h3>{heading}</h3>
      {children}
    </div>
  );
};

const DashboardSideMenuNotification = ({ linkLabel, linkTo, notification }) => {
  return (
    <>
      <div className="dashboard-menu-section-notifications">
        <Link to={linkTo}>{linkLabel}</Link>
        <div className="dashboard-menu-section-notification">
          {notification}
        </div>
      </div>
    </>
  );
};

const DashboardSideMenu = ({ bookings, events }) => {
  return (
    <div className={classNames(styles["dashboard-menu"])}>

      <DashboardSideMenuSection heading={"Booking Requests"}>
        <DashboardSideMenuNotification
          linkLabel={"Pending"}
          linkTo={"Pending"}
          notification={bookings.length}
        />
        <DashboardSideMenuNotification
          linkLabel={"Confirmed"}
          linkTo={"Confirmed"}
          notification={events.length}
        />
      </DashboardSideMenuSection>

      <DashboardSideMenuSection heading={"Guests"}>
        <DashboardSideMenuNotification
          linkLabel={"Manage"}
          linkTo={"Manage"}
          notification={bookings.length}
        />
        <DashboardSideMenuNotification
          linkLabel={"Updates"}
          linkTo={"Updates"}
          notification={events.length}
        />
      </DashboardSideMenuSection>

      <DashboardSideMenuSection heading={"Events"}>
        <DashboardSideMenuNotification
          linkLabel={"Next event"}
          linkTo={"Next event"}
          notification={bookings.length}
        />
        <DashboardSideMenuNotification
          linkLabel={"Upcoming"}
          linkTo={"Upcoming"}
          notification={events.length}
        />
      </DashboardSideMenuSection>
      
    </div>
  );
};

export default DashboardSideMenu;
