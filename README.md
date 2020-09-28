# Type 1 Diabetes Sugar Tracker

The goal of this website is to allow a user to track the carbs they ate during a meal, along with the fluctations of their blood sugars, tracked with
Dexcom. Dexcom is a continous glucose monitor that attaches to a diabetic's arm, and reads your glucose levels, every 5 minutes. The [Dexcom API](https://developer.dexcom.com) makes the glucose readings, calibration events, data range and user events available to third party apps.

While a Type 1 Diabetic calculates the number of carbs they eat in every meal, so they can properly dose their insulin, a diabetic's blood sugar may still end up going too high or too low. I wanted to allow a user of this app to see carb counts for a meal along with a line graph of their blood sugar fluctuations for that day. I’m using the [Edamam API](https://developer.edamam.com/) to allow the user to find the carb count of the foods they’d like to eat, and to upload the data for each meal (similarly to My Fitness Pal, but with a focus on carbs). I’m displaying the carb counts for a meal along with a line graph of their blood sugar fluctuations for that day. I’m hoping it will give the user visual insight into how their meal affected their glucose readings. I plan to continue by studying machine learning. I’d like to train the AI with the specific foods a user eats, how it affects their blood sugar, and then use that insight to time insulin injections. I think machine learning would be quite effective at helping someone avoid highs and lows.

I made a live demo version of the app, using mock data from Dexcom, so that the site can be used by someone who doesn't have a Dexcom account
Demo with sandbox data: https://t1d-sugar-tracker.herokuapp.com

![Image of schema](https://github.com/eaquin1/dexcom-project/blob/master/public/img/schema.png)
![Image of components](https://github.com/eaquin1/dexcom-project/blob/master/public/img/App.jpg)
[Dexcom API](https://developer.dexcom.com/)
[Edamam API](https://developer.edamam.com/)

Technologies used:

-   [React](https://reactjs.org/)
-   [Express](https://expressjs.com/)
-   [Passport.js](http://www.passportjs.org)
-   [Redis](https://redis.io/)
-   [Postgres-Node](https://node-postgres.com/)
-   [react-hook-form](https://react-hook-form.com/)
-   [Google Charts](https://developers.google.com/chart/interactive/docs)
-   [Material UI](https://material-ui.com/)
-   [React DatePicker](https://reactdatepicker.com/)
