# README

This is a simple application, comprising of a frontend, created using HTML and Javascript and the backend, created using Java and SpringBoot.<br />
Its aim is to transmit simple graph data via a websocket so that it can be displayed on the frontend as live data.

### Solution
Hope, I have fixed all the issues, resolved warnings and added improvements. Envrionemnt specific feature is also been added, this will give flexibility with URLS and other harded coded values. Due to this there is a slight change to npm in the third step.


## Running the application
1) `cd` into `src/frontent` directory and run `npm i`
2) From the directory contining your `build.gradle` file, run `./gradlew bootRun` to start the websocket server
3) Run `npm run start:dev`. This will launch the application on your browser on port `3000`
