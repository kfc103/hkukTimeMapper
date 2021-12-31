import { getDefaultData } from "./App";

export const prepareDb = () => {
  return new Promise((resolve, reject) => {
    //prefixes of implementation that we want to test
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    if (!indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB."
      );
    }

    var request = indexedDB.open("timezoner", 1);

    request.onerror = function (event) {
      //console.log("error: " + event);
      reject(event);
    };

    request.onsuccess = function (event) {
      var db = request.result;
      //console.log("success: " + db);
      resolve(db);
    };

    // This event is only implemented in recent browsers
    request.onupgradeneeded = function (event) {
      // Save the IDBDatabase interface
      var db = event.target.result;

      if (!db.objectStoreNames.contains("timezone")) {
        // Create an objectStore for this database
        var objectStore = db.createObjectStore("timezone", {
          keyPath: "id",
          autoIncrement: true
        });

        const DEFAULT_DATA = getDefaultData();
        objectStore.add({
          id: 1,
          object: DEFAULT_DATA[0]
        });
        objectStore.add({
          id: 2,
          object: DEFAULT_DATA[1]
        });
      }
    };
  });
};

export const readAll = (db) => {
  return new Promise(function (resolve, reject) {
    if (db) {
      let objectStore = db.transaction("timezone").objectStore("timezone");
      let list = [];

      objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
          //console.log("Name for id " + cursor.key + " is " + cursor.value.name);
          list.push(cursor.value.object);
          cursor.continue();
        } else {
          //alert("No more entries!");
          resolve(list);
        }
      };
    } else reject("undefined db");
  });
};

export const update = (db, item, id) => {
  return new Promise(function (resolve, reject) {
    if (db) {
      let request = db
        .transaction(["timezone"], "readwrite")
        .objectStore("timezone")
        .put({ id: id, object: item });

      request.onsuccess = function (e) {
        console.log(e);
        resolve();
      };
    } else reject();
  });
};
