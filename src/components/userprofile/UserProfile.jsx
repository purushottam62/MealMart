import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import Header from "../Header";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Orders");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header></Header>
      <div className={styles.profileContainer}>
        <aside className={styles.sidebar}>
          <h2>User Profile</h2>
          <ul className={styles.sidebarList}>
            {[
              "Orders",
              "Saved Address",
              "Edit Profile",
              "Select Language",
              "Notification Settings",
              "My Activity",
              "Coupons",
            ].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={activeTab === tab ? styles.activeTab : ""}
              >
                {tab}
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.content}>
          {activeTab === "Orders" && <Orders />}
          {activeTab === "Saved Address" && <SavedAddress />}
          {activeTab === "Edit Profile" && <EditProfile />}
          {activeTab === "Select Language" && <SelectLanguage />}
          {activeTab === "Notification Settings" && <NotificationSettings />}
          {activeTab === "My Activity" && <MyActivity />}
          {activeTab === "Coupons" && <Coupons />}
        </div>
      </div>
    </>
  );
};

// Sample components for each tab
const Orders = () => <div>Order details will be displayed here.</div>;
const SavedAddress = () => (
  <div>Saved address details will be displayed here.</div>
);
const EditProfile = () => <div>Edit your profile information here.</div>;
const SelectLanguage = () => <div>Select your preferred language here.</div>;
const NotificationSettings = () => (
  <div>Manage your notification settings here.</div>
);
const MyActivity = () => <div>Your activity log will be displayed here.</div>;
const Coupons = () => <div>Your available coupons will be shown here.</div>;

export default UserProfile;
