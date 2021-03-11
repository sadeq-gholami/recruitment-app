# IV1201-Project: Recruiretment Application
## Project Description

The recruitment-App is created and developed for the cource Design of Global Application. The main goal of this app is for the applicants to send in their applications to an amusentpark company and await to either be accepted or rejected. The applicants can both signup or login if they already have an account andthe apply for a job/jobs. The same applies for the recruiters as they too can login and review the applications and handle them appropriately by changing the status from "Unhandled" to either "Accepted" or "rejected".


## Installation
Assuming that node.js is already installed, clone the git repository and run the following command line in the project root:

`npm install --prefix frontend backend `

which installs the required npm packages in both frontend and backend since this repository contains both the REST api and the client.

## Tools

* Version control (Git)
* Project management (npm)
* Automatic restart (nodemon)
* Cloud runtime (Heroku)

## Frameworks

* Express
* MongoDB
* Jsonwebtoken
* Mysql
* React
* body-parser
* cookie-parser 
* express-validor
* express-session
* pg
* cors
* bcrypt


## Check-List tasks:

- [x] Authorization (mandatory)
- [x] Transaction management
- [x] Error handling
- [x] Deployment
- [x] JavaDoc comments
- [x] Database migration (Optional/ Mandatory)
- [x] Validation (optional)
- [x] Authentication (mandatory)
- [x] Succeeded with simple Rest Requests posting userLogin, posting expertise or getting all applicants.

## Backend 
The backend code is developed using NodeJs and Express and follows the MVC pattern.

The following are some of the accessible endpoints:
* //api.example.com/recruiter/get_applicants (GET)
* //api.example.com/applicant/competence (GET)
* //api.example.com/signup/signup/update_user/{id} (PUT)
* //api.example.com/signup (POST)

There are many more endpoints that could be tried using for example ***Insomnia*** or ***Postman***.\
The backend code consists of 4 layers, namely the controller, model, view and integration layer. 
* The model layer includes all the database schemas such as User, Competence and Availability. 
* The integration layer is responsible for calling the actual database. 
* The view layer consists of different classes, one for each functional requirement e.g. UserLogin and UserSignup. It even contains a class called RequestHandler.js which is responsible for initiating the controller and the router. 
* The controller handles all the method calls from the view to the integration layer.\
The view calls the controller to access the database which in turn calls the integration layer.\
View(Route) -> Controller -> Integration. 


## Frontend 
The Frontend code is written in JavaScipt using the React framework and thus the model Model View ViewModel (MVVM) is automatically implemented in order to separate View from the business logic.

### Usage

The Application's webpage is available in english only. It is hosted on heroku and can be reached through <https://recruitmentjob.herokuapp.com/>. The application is effortlessly simple and easy to understand.

#### Signup functionality

Although the application is uncomplicated, there are still some requirements that need to be fulfilled and this applies especially for the signup functionality.\
When visiting the webpage click the signup button to get to the signup page or just simply visit the above mentioned url/signup. In order to register, the user needs to enter all the necessary credentials. If all the credentials have not been filled, or a unique credential that is already in use has been entered, then the user will be blocked from proceeding.  
![signup page](https://gits-15.sys.kth.se/inaric/IV1201-Project/blob/master/Readmematerial/signup.png)

In addition, The information entered by the user needs to be valid. The validation of each credential is as follows:
* *Firstname*: Letters only.
* *Surname*: Letters only.
* *Email*: Characters@characters.domain where characters are allowed to be letters, numbers and symbols.
* *Social Security Number*: six or eight digits with or without dash between the first and the last four digits.
* *Username*: At least four characters that can be anything.
* *Password*: At least eight characters including one lower case, one upper case and one digit.

***The following code segment from the submitSignup method in the Signup.js class is where the input is validated***
 
![signup page](https://gits-15.sys.kth.se/inaric/IV1201-Project/blob/master/Readmematerial/signupfunc.png/)

        if (!firstnameRegex.test(this.state.firstname)) {
            window.alert("First name must be at least one character");
        }
        else if (!surnameRegex.test(this.state.surname)) {
            window.alert("Surname must be at least one character");
        }
        else if (!emailRegex.test(this.state.email)) {
            window.alert("Email must be in the format: characters@characters.domain");
        }
        else if (!ssnRegex.test(this.state.ssn)) {
            window.alert("SSN must be format YYMMDD-XXXX");
        }
        else if (!usernameRegex.test(this.state.username)) {
            window.alert("Username must be at least 4 characters");
        }
        else if (!passwordRegex.test(this.state.password)) {
            window.alert("Password must be at least 8 characters, one lowercase letter, one uppercase letter and contain at least one number");
        }
        else {....}


## Credits
##### Project developers:
 Amanda Heynes\
 Ina Rickman\
 Sadeq Gholami\
 Zeineb Amri
