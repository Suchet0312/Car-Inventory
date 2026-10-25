# Prompts Only

1. i am building this TDD Kata: Car Dealership Inventory System for my assignment. first go through the requirements properly and tell me how we should build this step by step. i want to follow TDD properly, so tell me what to do first and dont jump directly into the full implementation.

2. i want to build the backend first using FastAPI and then do the frontend using React and Tailwind. help me set up the folder structure properly and tell me what each file is for.

3. before writing the implementation i want to understand the flow. explain how the backend should be structured, how the routes, schemas, models, database and authentication will work together.

4. help me set up the python virtual environment in VS Code on Windows and install all the required dependencies for this project. give me the exact PowerShell commands.

5. what should i add in requirements.txt for this project? keep only the packages we actually need and explain briefly why each one is required.

6. help me set up SQLAlchemy with SQLite for this project. i want the data to persist even after restarting the backend, and i also want a separate database for tests.

7. now lets start with TDD. first write the test for user registration only. dont give me the implementation yet. tell me where to put the test and how to run it so that i can see it fail first.

8. the test is failing now. help me understand the error and what is the minimum implementation i need to add to make this registration test pass. explain the code line by line.

9. for registration i want email validation and password hashing. explain why we should never store the plain password and help me implement it properly.

10. now help me write tests for duplicate email registration, invalid email and weak password. i want to cover the edge cases too.

11. lets do login now using TDD. first give me the tests for correct email and password, wrong password and user that does not exist. dont give implementation before the tests.

12. help me implement login with JWT after the tests fail. explain what goes inside the token, how expiry works and how the frontend will send the token in later requests.

13. explain how JWT authentication works in FastAPI and how OAuth2PasswordBearer fits into this. i want to understand it instead of just copying the code.

14. now help me protect the vehicle endpoints so that only logged-in users can access them. first tell me which tests i should write and then we can implement.

15. help me write tests for invalid JWT tokens, missing tokens, expired tokens, tampered tokens and tokens with invalid user ids. make sure these tests check the actual protected endpoint.

16. i am getting an error while running the authentication tests. help me debug it step by step and dont assume the code is the same unless i show it to you.

17. help me create the SQLAlchemy models for User and Vehicle based on the assignment. explain each field and the reason for using primary key, unique email and nullable false.

18. now help me create the Pydantic schemas for registration, login, vehicle create, vehicle update and vehicle response. add the validations needed by the assignment.

19. lets do the vehicle create endpoint with TDD. first give me the tests for creating a vehicle with valid data and rejecting invalid price or quantity. wait before giving implementation.

20. now write the tests for listing all vehicles and make sure the endpoint requires authentication. tell me how to run only this test file.

21. help me implement the vehicle create and list APIs using FastAPI and SQLAlchemy. keep the code consistent with the files we already created.

22. now i need vehicle search by make, model, category and price range. first help me decide the test cases, including no results and invalid price range.

23. help me implement the vehicle search endpoint so that the filters can be used individually or together. explain how the SQLAlchemy query is built.

24. write tests for updating a vehicle. cover updating one field, updating multiple fields, invalid values and updating a vehicle id that does not exist.

25. help me implement the PUT vehicle endpoint using the update schema. fields that are not sent should stay unchanged, right? explain how to do that correctly.

26. now lets do delete vehicle. only admin should be allowed to delete a vehicle. give me the tests first for normal user, admin, unauthenticated user and vehicle that does not exist.

27. how should i handle admin role in this project? registration should not allow anyone to make themselves admin. explain a safe way to create an admin for local testing without adding a security hole.

28. help me implement the purchase endpoint. when a user purchases a quantity, the stock should decrease, but it should never go below zero. first lets write tests for normal purchase, zero stock and trying to buy more than available.

29. now do the restock endpoint. only admin should be allowed to restock a vehicle. give me the tests first and cover invalid quantity and missing vehicle too.

30. what happens if two users try to purchase the last vehicle at the same time? i want to avoid negative stock. explain the race condition and help me make the database update safe.

31. help me write a test for two purchases happening at the same time. i want to verify that the inventory never goes below zero.

32. my tests are using the real dealership.db and i dont want that. help me set up pytest fixtures with a temporary SQLite database for every test and override FastAPI get_db properly.

33. i have a global TestClient in my test file. could that be causing tests to share state? show me how to use the client fixture instead and explain why it is better.

34. help me fix the pytest fixture setup. i want the test database to be created before each test and cleaned up afterwards without touching my actual database.

35. all my tests are passing now. help me review whether the test suite actually covers the assignment requirements and the important edge cases. dont say it is complete unless we verify each requirement.

36. review my app/main.py and app/security.py for security issues. focus on JWT validation, role checks, inventory updates and error handling. tell me what is actually wrong and what should be changed.

37. is checking the JWT signature enough or should we also validate the sub claim and confirm that the user still exists in the database? explain and help me test it.

38. help me make the purchase and restock database updates safer. i want the quantity update to happen atomically so concurrent requests cannot cause incorrect stock.

39. how do i run all the tests and see a proper summary? also tell me how to run one test file or one specific test when debugging.

40. i want to commit the tests and implementation separately. tell me the exact git commands and commit messages. the assignment asks for AI co-author trailers, so include those too.

41. explain how to follow TDD properly with git commits. if i wrote implementation before tests, dont pretend that it was TDD. tell me how i should handle the history honestly and do the next feature properly.

42. check my git status and help me decide which files should go into the test commit and which should go into the implementation commit. dont include database files or environment secrets.

43. help me create a proper .gitignore for this FastAPI project on Windows. it should ignore the virtual environment, .env, SQLite database, Python cache and pytest cache.

44. now i want to start the frontend using React and Tailwind. first help me set up the project and folder structure, then we can build the pages one by one.

45. help me design the login and registration pages for the car dealership inventory app using React and Tailwind. keep the UI clean and professional, and make sure it connects to the FastAPI backend later.

46. help me build the dashboard that displays the vehicles from the API. it should show make, model, category, price and quantity, and handle loading, empty and error states.

47. add search and filters to the frontend for make, model, category and price range. explain how the frontend should call the backend and update the results.

48. in the frontend, the purchase button should be disabled when quantity is zero. also show useful error messages if the purchase fails or there is not enough stock.

49. help me show admin-only controls in the frontend for delete and restock, but dont rely only on hiding buttons for security. the backend must still enforce the admin role.

50. how should i store and send the JWT token from the React frontend? explain the trade-offs and avoid suggesting an unsafe setup without mentioning the risks.

51. help me connect the React frontend to FastAPI and handle CORS correctly for local development. give me the exact configuration and commands to run both sides.

52. help me test the full flow manually: register, login, add or view vehicles, search, purchase, restock and admin delete. make me a checklist so i dont miss anything.

53. i want to prepare the README for this assignment. include project overview, features, tech stack, setup instructions, how to run tests, screenshots section and AI usage section.

54. the assignment requires a My AI Usage section. help me explain honestly how i used AI for planning, debugging, understanding code and writing tests, without claiming that i did work i didnt do.

55. the assignment says PROMPTS.md should contain raw unedited AI chat logs or public chat links. help me understand what counts as raw logs and dont make up fake verbatim prompts or responses.

56. help me prepare the test report for the project. include the test command and results, but dont invent a passing result unless it is based on the output i actually got.

57. do a final audit of my car dealership project against the assignment requirements. check backend, authentication, roles, vehicle CRUD, search, purchase, restock, frontend, tests, README, git history and AI usage documentation. give me a checklist of what is done and what is still missing.

58. i want to deploy this project eventually. explain the options for deploying the FastAPI backend and React frontend separately, how environment variables should be configured, and how to use a persistent database in production.

59. i am using Windows PowerShell and VS Code, so give me commands that work in PowerShell instead of Linux commands. when you change code, tell me the exact file and whether i should replace the whole file or add only a section.

60. please explain things in simple language because i want to understand what i am building. dont just dump the full code. lets do one step at a time, run the test, understand the error and then move to the next step.

61. when you give code, keep it consistent with the code and folder structure we already have. dont suddenly change libraries or rename files without telling me why.

62. if something in my approach is wrong, tell me directly. i want the project to be correct and secure, not just to make the tests pass.

63. now according to the srs and backend create a frontend folder and create the full frontend for this project

64. can you do the video full screen like i dont want anything black like in the left and right side span full

65. in the cards below the search can we do like add images...same as login pop up we did same like that with the smooth transition

66. also i want everything in rupees

67. can you change the fonts a bit take some help from any professional car inventory systems

68. read through this entire document and tell me have we covered all the requirements

69. before creating the frontend check the srs properly and tell me exactly which pages and features we need to cover so we dont miss anything

70. help me set up the frontend using React and Vite inside a separate frontend folder. give me the exact commands to run in Windows PowerShell

71. now configure Tailwind CSS properly in the React project and make sure it is actually integrated and working, not just mentioned in the package files

72. help me decide a clean folder structure for the frontend with components, pages, services and styles. keep it simple and dont overcomplicate it

73. create the hero landing page for this car dealership inventory system with a full screen video background and a professional luxury car look

74. can you do the video full screen like i dont want anything black like in the left and right side span full

75. make sure the hero video covers the full screen on different screen sizes without stretching the video weirdly. tell me what css needs to change

76. add a smooth login and register popup modal instead of taking the user to a separate page. make the transition smooth and make the form look professional

77. connect the login and register forms to the FastAPI auth endpoints we already built. show the user proper errors if the credentials are wrong or registration fails

78. after login redirect the user to the dashboard and make sure the logged in state is handled properly when moving between the landing page and dashboard

79. help me build the vehicle inventory dashboard with cards showing the car image, make, model, category, price and quantity available

80. in the cards below the search can we do like add images and when i click the image it should open a detail popup same as login popup we did with the smooth transition

81. create a vehicle detail modal with a bigger image, vehicle information and an image gallery. keep the modal styling consistent with the login and register popups

82. add search and filters to the dashboard so that i can search vehicles by make, model, category and price range using the backend search endpoint

83. connect the search filters to the API and make sure the results update correctly when i change the filters or clear them

84. make the purchase button work with the purchase API and update the quantity on the card after a successful purchase without refreshing the whole page

85. disable the purchase button when the vehicle quantity is zero and show a clear message if the user tries to buy more than the available stock

86. add the admin controls to the dashboard for adding, editing, deleting and restocking vehicles, but show them only for an admin user

87. make sure the frontend role checks are only for the UI and that the backend still blocks normal users from admin-only endpoints

88. make the vehicle cards and detail modal responsive so that the layout works properly on desktop, tablet and mobile screens

89. use a premium monochrome color scheme with black, white and grey. make it look like a luxury automotive inventory website and not a basic college project

90. can you change the fonts a bit take some help from any professional car inventory systems and use a clean font for the main UI and a more premium font for headings

91. also i want everything in rupees. convert the prices shown on the frontend to INR and use the rate we discussed, but make sure the backend price values and display conversion are not accidentally mixed up

92. help me add smooth hover effects, modal transitions and small interactions without making the page too flashy or slow

93. connect the frontend and backend properly and fix the CORS settings so requests from the local Vite frontend are allowed during development

94. help me create a proper API service file for the frontend so all fetch calls and authorization headers are handled in one place instead of repeating them in every component

95. handle loading states, empty inventory, no search results, API errors and expired login sessions in the frontend so the user knows what is happening

96. check the frontend for any console errors, broken image paths, incorrect API URLs and layout issues. tell me what to test manually before calling it complete

97. help me run the frontend and backend together locally. give me the exact commands for PowerShell and explain which terminal should run each command

98. now compare the frontend against the srs and check login, register, dashboard, search, vehicle details, purchase, admin CRUD and restock one by one

99. check if Tailwind is actually being used in the frontend and help me fix it if the project currently uses plain CSS instead

100. help me seed some vehicle data for the dashboard so i can test the cards and search, but dont put fake production data into the real database by accident

101. the images should fit the vehicle cards properly and look consistent. help me set the image aspect ratio and object-fit without cropping them badly

102. make the dashboard design more compact and professional. the vehicle cards should show the important details clearly without taking too much space

103. help me clean up the frontend code and remove unused components, assets and files, but check that nothing required by the project is removed

104. check the entire repository structure and tell me whether the backend and frontend folders are organized properly and whether any required files are missing

105. help me create a STARTUP.md with the quick steps to start both frontend and backend locally, using the actual commands for this project

106. check the final README and STARTUP.md against the actual project setup.
