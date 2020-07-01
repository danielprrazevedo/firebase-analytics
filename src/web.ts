import { WebPlugin } from "@capacitor/core";

import { FirebaseAnalyticsPlugin } from "./definitions";

declare var firebase: any;

export class FirebaseAnalyticsWeb extends WebPlugin
  implements FirebaseAnalyticsPlugin {
  constructor() {
    super({
      name: "FirebaseAnalytics",
      platforms: ["web"],
    });
  }

  setUserId(options: { userId: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (firebase && firebase.analytics) {
        const analytics = firebase.analytics();
        const { userId } = options;

        analytics.setUserId(userId);
        resolve();
      } else {
        reject("firebase is not initialized");
      }
    });
  }
  setUserProperty(options: { name: string; value: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (firebase && firebase.analytics) {
        const analytics = firebase.analytics();
        const { name, value } = options;

        const property: any = {};
        property[name] = value;
        analytics.setUserProperties(property);
        resolve();
      } else {
        reject("firebase is not initialized");
      }
    });
  }

  getAppInstanceId(): Promise<{ instanceId: string }> {
    return new Promise((resolve, _reject) => resolve);
  }

  setScreenName(_options: {
    screenName: string;
    nameOverride: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (firebase && firebase.analytics) {
        reject("firebase is not initialized");
      }
      if (_options.screenName) {
        const analytics = firebase.analytics();
        analytics.setCurrentScreen(_options.screenName);
        resolve();
      } else {
        reject("userName is missing");
      }
    });
  }

  reset(): Promise<void> {
    return new Promise((resolve, _reject) => resolve);
  }

  logEvent(options: { name: string; params: object }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (firebase && firebase.analytics) {
        const analytics = firebase.analytics();
        const { name, params } = options;

        analytics.logEvent(name, params);
        resolve();
      } else {
        reject("firebase is not initialized");
      }
    });
  }
}

const FirebaseAnalytics = new FirebaseAnalyticsWeb();

export { FirebaseAnalytics };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(FirebaseAnalytics);
