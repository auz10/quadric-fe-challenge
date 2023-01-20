import { useEffect } from "react";
import { db } from "../db";
import Workflows from "./components/workflows";

const ENDPOINT_URL = "http://localhost:3000/";
const ROUTES = ["projects", "workflows", "users", "jobs", "traces"];

function App() {
  useEffect(() => {
    (async function () {
      try {
        const data = await Promise.all(
          ROUTES.map(async (route) => {
            const res = await fetch(ENDPOINT_URL + route);
            const json = await res.json();
            return json;
          })
        );
        ROUTES.forEach(async (name, i) => {
          try {
            await db[name].bulkAdd(data[i]);
          } catch (e) {}
        });
      } catch (e) {
        console.log("Something went: ", e);
      }
    })();
  }, []);
  return (
    <div className="bg-oxford-blue w-full h-screen overflow-hidden">
      <div className="mx-auto max-w-screen-lg text-platinum text-2xl font-bold mt-2">
        Workflows
      </div>
      <div className="mx-auto max-w-screen-lg overflow-scroll h-full pb-12">
        <Workflows />
      </div>
    </div>
  );
}

export default App;
