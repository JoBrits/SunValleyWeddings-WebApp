Sun Valley Wedding and Golf Venue redesign and enhancements by Johan Brits
https://sunvalleyweddingandgolfvenue.co.za/

Index
 
**01 Project Overview and Objectives**
1.1 What is the main goal of the project?
1.2 Who are the target users, and what are their needs?
1.3 What problem does this project aim to solve?

**02 Scope and Features**
2.1. Features:
2.1.1. Booking System (User-Facing)
2.1.2. User Registration and Profile Management (User-Facing)
2.1.3. Admin Dashboard (Admin-Facing)
2.1.4. Notifications and Alerts (User & Admin Facing)
2.1.5. Security and Data Management
2.2. Project Wireframes

**03 System architecture** 
3.1. Front-End (React):
3.2. Back-End (Express + Node.js):
3.3. Database (MongoDB):3.4. Key Functionality Breakdown:
3.5. Tech Stack Overview:

**04 System requirement specification**
4.1. Functional Requirements:
4.1.1. Booking System (Guest-Facing)
4.1.2. User Registration and Profile Management (Guest-Facing)
4.1.3. RSVP Management (Guest-Facing)
4.1.4. Signed In Dashboard (Guest-Facing)
4.1.5. Admin Dashboard (Admin-Facing)
4.1.6. Notifications and Reminders (User & Admin-Facing)
4.1.7. User Authentication and Access Control (User & Admin-Facing)
4.2. Non-Functional Requirements:
4.2.1 Performance: 
4.2.2 Security: 
4.2.3 Scalability: 




**01 Project Overview and Objectives**


1.1 What is the main goal of the project?

The main goal of the project is to re-design and enhance the Wedding section of the website to include a booking system for an administrator to track and manage bookings and registered users. A user should be able to to select an available date from a form with a calendar and submit a booking request. Once the Administrator then logs in a dashboard should be displayed with booking requests and the option to capture the users details. This should ensure a smooth booking process for users and provides admins with a dashboard to manage and confirm bookings.

After the booking is confirmed, users can register to create an account. This will involve a registration form that captures basic details like name, email, and password. A Profile page will then allow the users to manage their wedding RSVP.The admin dashboard will also includes the ability to view RSVP statuses, guest counts, and meal preferences. Admins can export this data to manage seating arrangements and catering.The system will provide a full-service platform for wedding guest management, from booking to RSVP tracking and meal preferences, with a secure admin dashboard to streamline event logistics. It simplifies communication between the wedding organiser and guests while ensuring accurate, real-time information to support the event planning process.



1.2 Who are the target users, and what are their needs?

The target users for the wedding booking and RSVP management system can be divided into two main groups: wedding guests and administrators (wedding organisers). Each group has specific needs based on their roles.By addressing the below needs, the system will create a seamless experience for both guests and administrators.

1.2.1 Wedding Guests (Users)
Needs:
Easy Booking Process: Guests want a simple and user-friendly way to select a wedding date and confirm their attendance.
Account Management: After booking, they need a way to create and manage their profile, update their RSVP status, and make adjustments to their guest count or food preferences (e.g., dietary restrictions, meal choices).
Convenient Communication: Guests may need reminders or updates, such as RSVP deadlines or changes to wedding arrangements.

1.2.2 Administrators (Wedding Organisers or Event Planners)
Needs:
Booking Management: Admins need a dashboard to view all booking requests, track the status (pending, confirmed, rejected), and gather user details like names, guest counts, and meal preferences.
RSVP Tracking: Administrators need to monitor RSVPs, including updates from guests, their attendance status, and food preferences. This helps them with planning seating arrangements, meal orders, and logistics.
User Profile Management: They need access to the guests' profile information in case adjustments are required (e.g., changes in guest count or preferences).
Automation: Automation of reminders and notifications to reduce manual communication for RSVPs and other wedding-related updates.
Security and Access Control: Secure login for the admin to ensure only authorised individuals can access sensitive data (e.g., guest information, bookings).



1.3 What problem does this project aim to solve?
The wedding booking and RSVP management system aims to solve several key problems for both wedding organisers and guests:

1.3.1 For Wedding Organisers (Administrators):
Manual and Time-Consuming RSVP Tracking:
Traditionally, tracking RSVPs, guest preferences, and managing communications can be tedious and prone to errors. This project automates the process, reducing the need for manual follow-up and ensuring up-to-date guest information.

1.3.2 Inconsistent Guest Information:
Organisers often deal with incomplete or inconsistent information (e.g., guest counts, dietary restrictions). This system ensures that guests provide all necessary details (like meal preferences) at the time of RSVP, allowing organisers to access reliable, real-time information.

1.3.3 Difficulty Managing Large Guest Lists:
Managing large guest lists, including their RSVPs, special requests, and meal preferences, becomes complex without the right tools. The project provides a structured dashboard where all guest details are centralised, making it easier to plan and manage the event.

1.3.4 Logistical Planning:
Organisers need accurate data on guest counts and preferences to plan seating, catering, and event logistics. The system simplifies this by providing real-time insights into RSVP numbers and specific guest needs, helping with efficient planning.



**02 Scope and Features**

2.1. Scope and Features

The system will cover the full lifecycle of wedding guest management, from booking and RSVPs to meal preference tracking and administrative oversight. It will cater to both wedding guests and administrators (wedding planners or organisers), ensuring secure and seamless management of guest information, event logistics, and communication.


2.1.1. Booking System (User-Facing)

Date Selection and Availability Check:
Guests can select an available wedding date using a calendar interface.
Validation to ensure the date is available and hasn’t been fully booked.

Basic Information Submission:
Guests provide basic details such as name, email, and number of guests when submitting the booking request.

Booking Confirmation:
Once a booking is approved by the admin, the guest receives a confirmation email with a link to register and manage their RSVP.


2.1.2. User Registration and Profile Management (User-Facing)

User Account Creation:
After booking confirmation, guests can register by creating an account with a secure password.
Email-based user authentication.

RSVP Management:
Guests can log in to confirm their attendance (RSVP) and indicate how many people will attend with them.
They can update their RSVP status before the deadline (attending/not attending).

Meal Preferences and Dietary Restrictions:
Guests can select meal preferences (e.g., vegetarian, vegan, non-vegetarian) and provide details on dietary restrictions (e.g., allergies, gluten-free).
Guests can update these preferences as needed.

Profile Updates:
Users can update personal information (e.g., email, contact details) and RSVP-related preferences.


2.1.3. Admin Dashboard (Admin-Facing)

Login and Authentication:
Secure admin login with JWT authentication for protected routes.

View and Manage Booking Requests:
Admins can see all booking requests in a centralised dashboard.
Each booking shows guest information, status (pending, confirmed, rejected), and the selected wedding date.

Approve or Reject Bookings:
Admins can approve or reject booking requests.
Upon approval, a confirmation email is sent to the guest with a link to register for RSVP management.

View and Manage RSVPs:
Admins can view all RSVPs, including guest attendance status, guest count, and meal preferences.
This information is used for event planning (e.g., seating, catering).

Print RSVP and Guest Data:
Admins can print guest information, including RSVP statuses, guest counts, and meal preferences, to help plan seating arrangements and catering logistics.


2.1.4. Notifications and Alerts (User & Admin Facing)

Automated Confirmation Emails:
When a booking is confirmed, guests receive an email with instructions to complete the registration and RSVP process.

RSVP Reminders:
Automated reminders for guests to RSVP by a certain deadline.
Event Updates:
Admins can send important event updates or changes to the guest list through automated email alerts.


2.1.5. Security and Data Management

User Authentication:
Secure user login for both guests and admins using JWT tokens.
Passwords will be securely hashed.

Role-Based Access Control:
Admins have full control over managing bookings and RSVPs.
Guests can only access and modify their own information.

Data Integrity and Validation:
Data validation to ensure users submit complete and accurate information (e.g., valid email format, guest count limits).


2.2. Project Wireframes
Please see supporting wireframes 2.3 High-Level Design.drawio



**03 System architecture** 
The architecture and functionality include the client-side (frontend), server-side (backend), database, and the communication flow between these layers. The system will be built using the MERN stack, which consists of MongoDB, Express.js, React, and Node.js.


3.1. Front-End (React):
The front end will handle the UI, allowing users (guests and admins) to interact with the system.

Key Components:
Booking Form: Allows guests to choose a date and submit a booking request.
Registration and Login: Enables guests to create accounts, log in securely, and manage their profiles.

RSVP Management: Guests can view and edit their RSVP status, guest count, and meal preferences.

Admin Dashboard: Accessible only to admins, this dashboard allows management of bookings and RSVPs.

State Management: Managed using React’s built-in hooks.


3.2. Back-End (Express + Node.js):

Handles API requests, business logic, and communicates with the database.Booking Routes:
POST /api/bookings: Allows guests to submit a booking request.
GET /api/bookings: Allows admins to retrieve and view all booking requests.
PUT /api/bookings/:id: Allows admins to approve or reject bookings.

User Routes:
POST /api/users/register: Allows guests to register an account.
POST /api/users/login: Handles user login, returning a JWT for authentication.
GET /api/users/profile: Allows guests to retrieve their profile, RSVP status, and preferences.
PUT /api/users/profile: Allows guests to update their profile, RSVP, and meal preferences.

Admin Routes:
GET /api/admin/bookings: Allows admins to view all bookings.
GET /api/admin/rsvps: Provides a summary of all guest RSVPs, guest counts, and meal preferences.
POST /api/admin/notifications: Allows admins to send notifications or updates to guests.


3.3. Database (MongoDB):MongoDB will store all relevant data, including user information, bookings, and RSVPs.
Key Collections:
Users Collection:
Stores user profiles (e.g., name, email, hashed password).
Stores RSVP status, guest count, meal preferences, and dietary restrictions.
Bookings Collection:
Stores booking requests (e.g., date, guest details, booking status).
Links each booking to the corresponding user profile.
RSVPs Collection:
Tracks each guest’s RSVP status and preferences, linked to the Users collection.
Admins Collection:
Stores admin users for secure access to the admin dashboard.


3.4. Key Functionality Breakdown:

Authentication and Authorisation:
JWT-Based Authentication:Users (both guests and admins) are authenticated using JSON Web Tokens (JWT). Upon login, a JWT is generated and stored in the browser (in local storage or cookies) for subsequent requests to protected routes.
Role-Based Access Control:Different roles (guest and admin) are assigned based on login. Admins have access to specific routes and the dashboard, while guests only access their own profiles and bookings.

Booking System:
Booking Request Submission:Guests can submit a booking request for a wedding date. This is saved in the Bookings Collection, and admins are notified.
Booking Management:Admins can view all bookings, approve or reject them, and send confirmation emails to guests.

RSVP Management:
RSVP Submission:After registration, guests can RSVP for the wedding. This information is stored in their profile and visible to admins.
Meal Preferences:Guests can submit their meal preferences and dietary restrictions, which are stored alongside their RSVP information for catering and event planning.
Dashboard for Admins:
View Bookings:Admins have a comprehensive view of all booking requests, RSVP statuses, and guest preferences in a dashboard format.
Data Export:Admins can export guest lists, RSVPs, and meal preferences for event planning purposes.


3.5. Technology Stack

Frontend: React.js (for building the user interface and managing state), Axios (for API requests).
Backend: Node.js with Express.js (for handling server-side logic and API routing).
Database: MongoDB (for storing user profiles, bookings, and RSVPs).
Authentication: JWT (for secure authentication and authorisation).
Email Service: Nodemailer or a third-party service like SendGrid (for sending confirmation emails and reminders).



**04 System requirement specification** 


4.1. Functional Requirements:
The functional requirements for the wedding booking and RSVP management system define the specific actions and behaviours the system must support. These requirements ensure that the system meets the needs of both wedding guests and administrators. 


4.1.1. Booking System (Guest-Facing)

View Available Wedding Dates
Guests must be able to view available wedding dates using a calendar or list interface.
Details:
Dates should be displayed in a user-friendly calendar format.
Booked or unavailable dates must be visually distinct (e.g., grayed out).
Input: None (view-only).
Output: A calendar or date picker with available and unavailable dates highlighted.

Submit a Booking Request
Guests can submit a booking request by selecting a wedding date and providing basic information.
Details:
Required fields: name, email, number of attendees, preferred date.
A validation step ensures that the selected date is still available.
On submission, the request is stored in the system as "pending" and awaits admin approval.
Input: Guest information and preferred date.
Output: A confirmation message that the booking request was submitted.

Booking Confirmation
Once the admin approves the booking, the guest must receive a confirmation notification (via email).
The system sends an automatic email with a booking confirmation and next steps (e.g., creating an account for RSVP management).
Input: Admin approval.
Output: Email sent to the guest.


4.1.2. User Registration and Profile Management (Guest-Facing)

User Registration
Guests must be able to create an account after their booking is confirmed.
Details:
Fields: full name, email, password, and contact information.
Passwords must be hashed for security.
The system should prevent duplicate registrations with the same email.
Input: Registration form data.
Output: User account created with a unique profile.

User Login and Authentication
Guests must be able to log in to their accounts securely.
Details:
Guests provide their email and password to log in.
The system authenticates users using JWT tokens.
Input: Email and password.
Output: Access to the user’s profile page.

View and Edit Profile
Guests must be able to view and update their profile information.
Details:
Guests can update their email, contact details, and preferences (e.g., food or attendance).
Profile page displays the current status of their booking and RSVP.
Input: Updated profile information.
Output: Updated user profile in the system.


4.1.3. RSVP Management (Guest-Facing)

RSVP Submission
Guests must be able to submit their RSVP, confirming attendance and number of guests.
Details:
Fields: RSVP status (attending/not attending), number of guests, meal preferences, dietary restrictions.
The system should set a limit on the maximum number of guests.
Deadline notifications should remind users to submit their RSVP before the due date.
Input: RSVP details (status, guest count, preferences).
Output: RSVP saved in the system.

Update RSVP
Guests must be able to update their RSVP and preferences until a set deadline.
Details:
Guests can modify the number of attendees, meal preferences, and dietary restrictions before the RSVP deadline.
Changes must be reflected in the admin dashboard.
Input: Updated RSVP details.
Output: Updated RSVP stored in the system.

Meal Preferences and Dietary Restrictions
Guests must be able to submit meal preferences and dietary restrictions.
Details:
Options: vegetarian, vegan, non-vegetarian, gluten-free, other (with custom input).
Admins need to access this data for catering planning.
Input: Meal and dietary preference details.
Output: Preferences stored in the user’s profile.


4.1.4. Signed In Dashboard (Guest-Facing)

RSVP Management:
Guests can view and manage their RSVP status, including options to confirm or decline attendance.
Guests can specify the number of attendees (if plus-ones are allowed) and include any additional comments.

Meal and Dietary Preferences:
Guests can select meal preferences from options like vegetarian, vegan, gluten-free, etc.
Guests can input any specific dietary restrictions and allergies.
Saved meal choices are confirmed and accessible for updates until the RSVP deadline.

Event Schedule and Itinerary:
Guests can view a schedule of wedding events (e.g., ceremony, reception, brunch) with times, locations, and descriptions.
Ability to add events directly to a personal calendar (Google, Outlook).

Profile Management:
Guests can view and update personal information (e.g., contact details) on their profile.
Option for guests to change their password and manage security settings.


4.1.5. Admin Dashboard (Admin-Facing)

Admin Login and Authentication
Administrators must log in securely to access the admin dashboard.
Details:
Admins log in using email and password, with authentication handled by JWT.
Admin routes are protected, ensuring only authorised users can access them.
Input: Admin credentials.
Output: Access to the admin dashboard.

View Booking Requests
Admins must be able to view all pending and confirmed booking requests.
Details:
The system shows a list of bookings with details (guest name, email, selected date, status).
Bookings are filtered by status (pending, confirmed, rejected).
Input: None (view-only).
Output: List of booking requests in the admin dashboard.

Approve or Reject Bookings
Admins must be able to approve or reject booking requests.
Details:
Admins approve or reject requests via buttons in the dashboard.
Upon approval, the guest is notified via email with a confirmation.
Rejected bookings trigger a notification with an explanation (optional).
Input: Admin decision (approve/reject).
Output: Booking status updated, and email notification sent to the guest.

View and Manage RSVPs
Admins must be able to view a summary of guest RSVPs, including guest count and meal preferences.
Details:
The system shows the RSVP status of each guest, their total number of attendees, and meal preferences.
This information is used for seating and catering arrangements.
Input: None (view-only).
Output: Summary of RSVPs displayed in the dashboard.

Export Guest List and RSVP Data
Admins must be able to export guest and RSVP data for offline use (e.g., for catering or seating arrangement purposes).
Details:
Export format: CSV or Excel.
Export includes guest name, email, RSVP status, number of attendees, meal preferences, and dietary restrictions.
Input: None (view-only).
Output: Downloadable file with guest information.

Booking Management:
Administrators can view and manage all booking requests, including pending, confirmed, and rejected statuses.
Ability to approve or reject booking requests, with automated email notifications sent to guests upon status change.
Search and filter capabilities to quickly find bookings by guest name, event date, or booking status.

RSVP Management:
Administrators can access and manage RSVP responses, including viewing the total number of attending and non-attending guests.
View meal choices and dietary restrictions, with filtering options for preferences like vegetarian or vegan.
Export RSVP data (to CSV/Excel) for catering and planning purposes.

Guest Profile Management:
Access to all guest profiles, with the ability to view, update, and manage profile details such as contact information and RSVP choices.
Administrators can manually adjust RSVP details or dietary requirements based on guest requests.

Event Timeline and Milestones:
A calendar view showing key wedding dates and RSVP deadlines.
Administrators can add reminders for tasks like finalising RSVPs or sending out event details.

Notifications and Communication:
Administrators can send bulk notifications or personalised messages to guests regarding important updates.
Option to manage automated RSVP reminders and set timings for reminders (e.g., one month before the event).

User and Access Management:
Admin controls for creating, editing, or removing other admin accounts.
Activity logs that track administrator actions, including approvals, rejections, and profile updates, for transparency and accountability.


4.1.6. Notifications and Reminders (User & Admin-Facing)

Booking Confirmation Email
Upon admin approval, the system sends an automatic booking confirmation email to the guest.
Details:
The email includes booking confirmation, event details, and a link to register an account for RSVP management.
Input: Admin approval.
Output: Confirmation email sent to the guest.

RSVP Reminder Emails
The system must send automatic reminder emails to guests who have not submitted their RSVP.
Details:
Reminders are sent at specified intervals (e.g., one month and one week before the RSVP deadline).
The email includes a link to the RSVP form and a reminder of the deadline.
Input: Time-based trigger.
Output: Reminder emails sent to guests.

Event Updates and Notifications
Admins must be able to send notifications or updates (e.g., schedule changes, venue updates) to all guests or selected groups.
Details:
Admins send updates via the dashboard, triggering email notifications to guests.
Admins can target notifications to specific guest lists (e.g., all guests, confirmed attendees).
Input: Admin input (message, recipient list).
Output: Notification emails sent to guests.


4.1.7. User Authentication and Access Control

Guest Registration and Login:
Guests can register and create profiles with a secure login, including fields like name, email, and contact information.
Secure login and logout functions, with password reset options.

Administrator Login:
Administrators have secure login access to the admin dashboard to manage booking requests and RSVPs.
Multi-level access control to separate guest and administrator functionalities.


4.1.8. System-Wide Functional Requirements

Secure Data Storage and Privacy:
All guest and administrator data, including profiles, booking requests, RSVP status, and dietary preferences, are stored securely in MongoDB with access controlled through proper authentication.

Automated Notifications and Reminders:
Guests and administrators receive automated notifications for upcoming RSVP deadlines, booking confirmations, and schedule updates.



4.2. Non-Functional Requirements:

4.2.1 Performance: 
The system must load content quickly and efficiently, using lazy loading or caching where appropriate.

4.2.2 Security: 
Sensitive data (e.g., admin credentials, JWT tokens) must be securely handled, and the system should follow best practices to prevent vulnerabilities like XSS and CSRF attacks.

4.2.3 Scalability: 
The system must be scalable to support growing numbers of rules, components, templates, and users over time.