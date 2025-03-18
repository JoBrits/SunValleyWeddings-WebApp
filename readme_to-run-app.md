## !NB
After sitting with a mentor I was advised that deployment to Heroku is no longer mandatory. 

## Project Links
Git Repo - https://github.com/JoBrits/SunValleyWeddings-WebApp 
Mongo DB - https://cloud.mongodb.com/v2/6657de4ff03b2142c1f3da51#/metrics/replicaSet/6657e07eb485d34be012a15c/explorer/sunvalley-weddings 


## To run application: 
1. Open SunValleyWeddings-WebApp folder 
- Install Node Modules by typing ‘npm install' from the command line interface.
- launch the backend of the app by typing ‘npm start’ from the command line interface.

2. Open SunValleyWeddings-WebApp/client folder 
- Install Node Modules by typing 'npm install' from the command line interface.
- launch the frontend of the app by typing ‘npm start’ from the command line interface.

## How to use the Application
(User Not Logged In)
- From your react localhost root url (http://localhost:3000/) navigate to the wedding section (http://localhost:3000/Weddings)
- From The wedding section the user can scroll or click through to each section giving a brief overview of what services are included
  with the wedding venue.
- The user can then click on "Book Now" to create a booking request.
- You will be directed to (http://localhost:3000/bookings)
- From here the user can select their prefered date from the calendar and will be promted to add their information on a form.
- After Submitting the request, a list of booking requests is stored in local storage as the user is not registered yet, the list is also displayed on page if the user needs to make any amendments to their booking request. 


(Admin Logged In)
- An administrator can log in to their Admin Dashboard through (http://localhost:3000/SignIn)
- A list of pending booking requests is displayed from the dashboard where the admin user has the choice to confirm or decline a booking request from either the list item or using the "Booking Management" (http://localhost:3000/admin/bookings/) tab.
- After Confirming the request, the admin user will go the "User Profiles" (http://localhost:3000/admin/users) tab  
- From here the Admin user can see if the new request is from a registered user or a new user and send out a request to register a profile.(Future development and not part if this demo)
- As an administrator the user can also view and manage :
    - registered and non registered users from (http://localhost:3000/admin/users)    
    - track booking rsvp's (http://localhost:3000/admin/rsvp)
    - Log new events through (http://localhost:3000/admin/events)
- Side Menu also provides additional functionality to link to filtered views of the sections.    

(Existing admin email and password)
- You can use the below to login with an existing user
- email: jjohanbrits@gmail.com
- password: jmJ7nH6bG%s


(Signup new user and User Logged In)
- After receiving a request to register via email from an administrator (Future development and not part if this demo)
- The user can click on the Signup button top right to create a new user
- Using Validator module to validate for a string password
- Please use Uppercase Lowercase and a special character

(Once logged in)
- The registerd user will now see all their booking request and will be able to manage their guests from their dashboard.
- The user can create a new bookings and mange them.
- Add Guests for a specific booking
- Manage Guests dietary restrictions
- Create a Wedding Day Schedule 

(Existing user email and password)
- You can use the below to login with an existing user
- email: rianalb@gmail.com
- password: rmJ7nH6bG%s

(Logout)
- To logout click the Logout button top right


## Security and Validation
Using JWT module for tokenisation 
Using bcrypt module to Hash passwords
Using validation module for email and password validation


