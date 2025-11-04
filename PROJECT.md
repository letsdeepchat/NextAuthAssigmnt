**Frontend Assignment:

Login Authentication with Idle User Handling, JWT Token Authentication, and Image List with Search Feature

Objective: Your task is to create a frontend application using Next.js that implements login authentication with JWT tokens and includes a home page displaying a list of images with a search feature. Additionally, the application should handle idle user sessions by automatically logging them out after a certain period of inactivity and session expire.

Requirements:

1. User Interface:

∙       Develop a register page with fields for username and password.

Develop a login page with fields for username and password.

∙       After successful login, check if user does exist or not, if true redirect the user to a home page.

∙       Create a home page displaying a list of images names fetched from an external any free API.

∙       Implement a search feature allowing users to filter the images list by name.

2. JWT Token Authentication - (Use frontend JWT library and static secret key):

∙       Implement login authentication using JWT tokens. Generate a JWT token upon successful login and include it in subsequent requests to authenticate the user.

∙       Ensure that the user remains authenticated and can access protected routes after logging in.

3. Idle User Handling:

∙       Implement functionality to detect when the user has been idle for 2 minutes.

∙       If the JWT token is expire, automatically log them out and redirect them to the login page with the message "

You've been logged out".

4. Images List:

∙       Fetch a list of images names from a public API (e.g., [https://jsonplaceholder.typicode.com/photos](https://jsonplaceholder.typicode.com/photos) or any other).

∙       Display the fetched image title only on the home page.

∙       Implement a search feature allowing users to filter the image list by title. The search should update the displayed image list dynamically as the user types.

5. Error Handling:

∙       Implement appropriate error handling for all requests, such as authentication failures, and other potential errors.

∙       Display user-friendly error messages to guide users in case of any issues.

6. Code Quality:

∙       Write clean, readable, and maintainable code following best practices.

∙       Use reusable components where appropriate.

∙       Comment your code to explain complex logic or functionality.

7. Bonus (Good to have, not mandatory):

∙       Implement pagination for the image list to handle large datasets efficiently.

∙       Add functionality to view additional details about each image when clicked.

Submission:

∙       Share the entire running project in a zip folder.

∙       Include a text file with instructions on how to run your application locally.

∙       Ensure that your code is well-documented and easy to understand.

Note:

∙       You are free to use any additional libraries or frameworks that you find necessary.

∙       Focus on functionality, code quality, and user experienc

∙       e. A polished and well-implemented solution is more important than additional features.

∙       Feel free to ask any questions if you need clarification on the requirements. Good luck!

**
