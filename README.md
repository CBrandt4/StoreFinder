This is a React Native project, initially bootstrapped using `@react-native-community/cli` template.
It was created by Christian Brandt in June 2025. Currently, it serves as a POC for "Find Stores" feature
within a mobile banking app.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

Make sure you have installed node modules using "npm install", and if on iOS you have installed pods.
If you have a hermes error on iOS, disable hermes in the podfile.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Google API setup

This project currently uses a google maps API key for three things:

You will need to generate a Google Maps API key in the Google API console,
and you will need to enable access for
iOS Maps SDK
Android Maps SDK
Places API
Search API - I think

This will enable the following:

1. Loading the google maps map view
2. Fetching stores using the places api with a search string
3. Fetching locations from the search bar input

You will need to add the api key to androidManifest.xml, as well as create a .env file with API_KEY = "your api key here"

You can also paste the api key in androidManifest.xml and the Context files if you plan to only run the app locally and not push to github, or store the key on a database if you plan to make the project public.

Right now iOS and Android will load google maps. remove "PROVIDER_GOOGLE" to load apple maps view on apple, while keeping google for android.

# API Cost

Right now, each api call is about $0.02. So, if a customer hits "Search this area" repeatedly, or many customer are using the app with your api key, it will be quite expensive.

We could fetch the store locations from a database. This would make each fetch free, but would require maintenance to keep an updated list of stores, especially with stores possibly opening and closing permanently.
This would be a fixed cost model, where api costs don't scale with customer traffic.

# Future features

0. When "Get Directions" button is tapped, the customer has options between Waze, Apple Maps, Google Maps.

1. User has option between "Get Directions" or "Shop Online"

2. Map markers (pins) can be "connected" to the list view.
   They highlight/emphasize together
   Map centers around the store pin that you have selected on the list view

# Current issues

1. "Search This Area" button should only appear when the region is new, and should disappear when pressed.

2. Need permission for logos before re-distribution

3. Design can be re-made with Barclays Blueprint components.
   UI is designed in Figma with these components in mind, but developed with custom versions.

4. Clustering: To avoid overlap, the store pins cluster together with a number like "+2" or more.
   Because stores can be next door or connected, sometimes it requires
   excessive zooming in to disconnect clusters. One fix is to implement expandable clusters when tapped.
