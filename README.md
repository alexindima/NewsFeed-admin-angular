#  News feed with endless news loading

### The news feed is written using a **react**. Main features:
- Articles don't load all at once. Articles are loaded when the scroll approaches the bottom of the browser screen.
- Articles consist of a title and a body. The body can contain text, links and images in any order and in any quantity
- Each article has a category. The list of categories is received from the server
- An article can contain multiple tags
- It is possible to sort the display by categories and tags
- Search by the content of articles is implemented
- There is a section of recommended articles. Recommended articles come from the server

It is possible to create an account on the site. Registration provides the following advantages:  
- Ability to set categories that will be ignored. Articles with the selected categories will not be displayed, and the selected categories will disappear from the category list.
- Ability to set tags that will be ignored. Articles containing such tags will not be displayed

The ability to change the user's name and password is implemented. The user with ID 1 is an administrator. This user has the opportunity to go to the admin panel (not implemented yet, it is planned to be implemented on the Angular). Also, the administrator's authorization will not be saved when the page is reloaded for security

Known disadvantages:
- Since the server part is performed by the Json Server, the server's capabilities are very limited, and most of the server functions are performed by the frontend. This leads to a loss of performance and security vulnerabilities
- The ability to hide popups when clicking outside of them has not yet been implemented
- Since there is no email server, password recovery has a formal form
- Big design problems
- HTTP request error tracking has not been implemented yet
- Since only the user ID is stored in the browser, when the page loads, the ignored tags and caterogies are loaded from the server, and if they exist, an additional rendering of articles occurs. Only the ID is saved due to the fact that the user can change the ignored information on another computer, which will make the saved data irrelevant.

To launch the application, run
```
npm run start
```

The application will launch at http://localhost:3000/ 

The server will start at http://localhost:3030/

There is a small delay on the server to be able to see the data loading spinner
