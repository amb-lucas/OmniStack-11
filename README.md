# OmniStack-11
This is a project created during Rocketseat's OmniStack 11 event.

The idea was to develop a product to help NGOs earn funds via donations.

It consisted on a development of a server, a website and an app.
Please note that the Portuguese language was used for the UI.

## Back-end
The server was necessary to store NGOs infos, such as name, contact and their respective cases.

It was built using Node with express and uses a SQLite database, which is accessed via knex.
The queries have validations developed with celebrate there are also tests developed with jest.

## Front-end
The website is used for NGOs to sign up their cases.
It has a total of 4 pages:

- [Landing Page](screenshots/front-end/landingPage.png)

- [NGO sign up](screenshots/front-end/registration.png)

- [List of NGO's cases](screenshots/front-end/profileFilled.png)

- [New case registration](screenshots/front-end/newCase.png)

It was developed using ReactJS and it communicates with the back-end with Axios.

## App
The app was made for users interested in helping.
It lists all open cases in need of donation and redirects the user to contact the NGO via Email or Whatsapp.

It has a total of 3 pages:

- [Splash](screenshots/mobile/splash.jpeg)

- [Cases List](screenshots/mobile/casesList.jpeg)

- [Case Details](screenshots/mobile/caseDetails.jpeg)

The mobile app was developed using React Native.
