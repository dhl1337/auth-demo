# auth-demo
User can login with their email address and password. 
If the user does not choose to use their email, they could use their social media to access the site.
Once the user puts their credentials in, they would be able to navigate to the home page, which allows them to link other social media sites together.

## Technology
* Semantic UI
* Angular.js
* MongoDB
* Mongoose.js
* Express.js
* Passport.js
* Node.js
* Bcrypt

## Installation
Clone this repo to your desktop and run `npm install` to install all the dependencies.

`/auth-demo/src/server/config` make sure you add `auth.js` and `config.js`

In your `auth.js` fill in the credentials. 
```
module.exports = {
    'facebookAuth' : {
        clientID: 'FACEBOOK_APP_ID',
        clientSecret: 'FACEBOOK_APP_SECRET',
        callbackURL: "http://127.0.0.1:8080/auth/facebook/callback"
    },
    'twitterAuth' : {
        'consumerKey': 'TWITTER_CONSUMER_KEY',
        'consumerSecret': 'TWITTER_CONSUMER_SECRET',
        'callbackURL': 'http://127.0.0.1:8080/auth/twitter/callback'
    }
};
```

***FACEBOOK***

You could get `clientID` and `clientSecret` from facebook developer `https://developers.facebook.com/`

Here is the Facebook tutorial to get it. `https://www.youtube.com/watch?v=JGY9mQkRxK0`

***TWITTER***

You could get `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` from `https://dev.twitter.com/`

Here is the Twitter tutorial to get it. `https://www.youtube.com/watch?v=svoUK2DmGmw`


In your `config.js` file should look similar to this. Your secret key can be anything you want. The port number should be the same as callback url.
```
module.exports = {
    session: {
        secret: 'whateversecretkeyowant'
    },
    port: 8080
};
```
## Usage
Once the dependencies are installed, you can run `nodemon` to start the application. 

You will then be able to access it at `127.0.0.1:8080`

## Known Issues
* User is not getting notification if the credentials is incorrect.
* User is not getting notification the email have been taken.
* User have to refresh the page after unlinking from the other accounts.

## Contact
* email: dhl1337@gmail.com
* linkedin: linkedin.com/in/danhoangle
* portfolio: danhoangle.com
