import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
      }else{
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
      }
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export async function putDB(content){
  // console.log("PUT to the database");
  const jateDB= await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const result = await store.put({id: 1, value: content });;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export async function getDB (){
  // console.log("GET from the database");
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readonly");
  const store = text.objectStore("jate");
  const result = await store.getAll();
  console.log("result.value", result);
  return result.value;
};
// console.error('getDb not implemented');

initdb();