// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserProperties, setUserId } from "firebase/analytics";
import { Analytics, AnalyticsCallOptions, CustomParams } from "@firebase/analytics";
import { app_env, app_origin, isClient } from "utils/Env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// https://firebase.google.com/docs/analytics/get-started?platform=web&authuser=4&hl=en

class GoogleAnalytic {
  public analytics?: Analytics

  init() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDNqHXqYfPE2NFjqimOk3ScmuL7RHssbuE",
      authDomain: "lucis-analytic.firebaseapp.com",
      projectId: "lucis-analytic",
      storageBucket: "lucis-analytic.appspot.com",
      messagingSenderId: "959447441446",
      appId: "1:959447441446:web:ac9b0d0c6ebcb3bde986e7",
      measurementId: "G-YGQFXNTH9Z"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    this.analytics = getAnalytics(app);

    this.setUserProperties({
      // TODO: Verify if it does not override user info
      last_app_env: app_env,
      last_origin: app_origin,
    })
  }

  logEvent(event_name: string, event_params?: { [key: string]: any; }) {
    logEvent(this.analytics!, event_name, event_params);
  }

  /**
   * Should set props when app init and when user logged in or change their info
   */
  setUserProperties(properties: CustomParams, options?: AnalyticsCallOptions) {
    if (properties.id) {
      // Set user id across the whole Lucis ecosystem
      setUserId(this.analytics!, "" + properties.id)
    }
    setUserProperties(this.analytics!, properties, options);
  }
}

const GAService = new GoogleAnalytic();
if (isClient) {
  GAService.init();
}


export default GAService;
