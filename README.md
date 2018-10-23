# [Gifstagram (ver1)](https://github.com/jaimemendozadev/homework-front-end)

A single page application that lets you find your favorite Gif from [Giphy.com](https://giphy.com/)!

Infinitely scroll to find the trending Gifs on [Giphy.com](https://giphy.com/) on your mobile, tablet, or desktop computer. You can even search for what your heart desires!

![hell-to-the-yeah-gif](https://media.giphy.com/media/jErnybNlfE1lm/giphy.gif)


## Table of contents

- Initial Setup
- Create a `.env` File
- Starting the App
- App Issues
- Future +Plus Features
- Created By

## Initial Setup

Open up your terminal and clone the repo locally to your computer by running the following command at the target destination: `$ git clone https://github.com/jaimemendozadev/homework-front-end.git`

You will need a Giphy API Key to get the app to work. Go to the [Giphy Developers website](https://developers.giphy.com/) and click on the `Create an App` button to register the app and get an API Key. The good folks at Giphy also [have great documentation](https://developers.giphy.com/docs/) on how to use the API.

## Create a `.env` File

![donatello-typing](https://media.giphy.com/media/cFdHXXm5GhJsc/giphy.gif)

Fire up your terminal and create a new `.env` at the root of the app folder by simply typing `$ touch .env.`

After creating the `.env` file, use your text editor to enter all the necessary credentials, urls, and app variables (like the Giphy API Key) into separate lines inside the `.env` file. 

Do not end the line with punctuation or spacing. The `.env` should appear like the following snippet:

```
BASE_GIPHY_URL = https://api.giphy.com/v1/gifs

API_KEY = ENTER_YOUR_API_KEY_HERE

PORT = 4000
```

After creating the `.env` and you fire up the app, the key value pairs in the file will correspond to any line of code that references `process.env`.

## Starting the App
This project uses the [Yarn package manager](https://yarnpkg.com/en/). Go to the Yarn website to learn more about how to install the package manger on your computer.

In the root of the app, use your terminal to run `$ yarn install` to install all the app dependencies. Wait until everything finishes loading.

In the same terminal window, type and enter `$ yarn run dev:build` to build all the dependencies. Wait until everything finishes building.

Finally in another opened terminal tab, type and enter the command `$ yarn run start` to start the app.

Go to `http://localhost:4000` in your favorite browser to view the website. 

Remember, you can always stop the server from running by typing `Control + z` in the terminal window you used to start the app.


## App Issues
Because this is a version 1, there are a few issues that have to be addressed:

- Since we're using infinite scrolling, we're making so many API calls that the user experience delays between scrolling and searching.



## Future +Plus Features
- Give Users the ability to upload their own GIFs to [Giphy.com](https://giphy.com).

- Enable users to 💗 favorite their Gifs and persist them in a database.


## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)