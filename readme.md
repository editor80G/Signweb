## Cheat sheet

## Adapt Skeleton to New Exam
 - [x] Remove old styles and paste new styles
 - [x] Copy all html files into views folder
 - [x] Extract new layout
 - [x] Add header and fix title
 - [x] Fix navigation
 - [x] Fix error notification
 - [x] Add {{{body}}}
 - [x] Add footer
 - [x] Switch home template
 - [x] Change db name
 - [x] Modify login page
 - [x] Add values to fields
 - [x] Modify register page
 - [x] Add values to fields
 - [x] Modify User model
 - [ ] Modify token data
 

1. Initialize project
   - [x] 'npm init --yes'
   - [x] Change module system
   - [x] Nodemone setup 'npm i -D nodemon'
   - [x] Add start script
   - [x] Setup debugging
2. Express (Node.js web application framework)
   - [x] Install 'npm i express'
   - [x] Setup initial http server
   - [x] Add public resources (images, css...) 
   - [x] Add static middleware
   - [x] Add body parser
   - [x] Add routes module router
   - [x] Add home controller
3. Handlebars (templating engine)
   - [x] Install 'npm i express-handlebars'
   - [x] Config handlebars as view engine
   - [x] Enable mongo documents to be passed to the view
   - [x] Change views directory
   - [x] Add resources to views folder
   - [x] Add home view
   - [x] Add layout
   - [x] Add partial dir
4. Datadase
   - [x] Install ORM mongoose 'npm i mongoose' 
   - [х] Setup db connection
   - [x] Add user model
5. Register
   - [x] Fix navigation links
   - [x] Add register view
   - [x] Add authController
   - [x] Add register page
   - [x] Fix register form
   - [x] Add post register action
   - [x] Add authService with register
   - [x] Install bcrypt 'npm i bcrypt'
   - [x] Hash password
   - [x] Check confirmPassword
   - [x] Check if user exists
6. Login
   - [x] Add jsonwebtoken 'npm i jsonwebtoken'
   - [x] Add cookie parser middleware
   - [x] Add login view
   - [x] Add get login action
   - [x] Fix login form
   - [x] Add post login action
   - [x] Add login to authService
   - [x] Validate user
   - [x] Validate password
   - [x] Generate token
   - [x] Return token as cookie
   - [x] Autologin on register
7. Logout
   - [x] Add logout action
8. Authentication
   - [x] Add cookie parser 'npm i cookie-parser'
   - [x] Add auth middleware
   - [x] Check if guest 
   - [x] Token verification
   - [x] Attach user to request
   - [x] Attach user to handlebars context
9. Authorization
   - [x] Add isAuth middleware
   - [x] Add route guards authorization
9. Error Handling
   - [x] Add notifications
   - [x] Extract error message
   - [x] Add error handling for register
   - [x] Add error handling for login
10. Bonus  
   - [x] Dynamic navigation
   - [x] Dynamic Titles
   - [x] Set Dynamic Titles from View
   - [x] Async jsonwebtoken
   - [x] Add types to jsonwebtoken lib ( file jsonwebtoken.d.ts )
11. TempData (Optional)
   - [x] Install express session 'npm i express-session' 
   - [x] Config express session
   - [x] Add temp data middleware
  




