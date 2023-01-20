import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db } from "../../db";
import Workflow from "./workflow";

const Workflows = () => {
  const [filter, setFilter] = useState(null);
  const workflows = useLiveQuery(() => {
    if (filter === null) return db.workflows.toArray();
    return db.workflows.where("status").equals(filter).toArray();
  }, [filter]);
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="rounded-full border bg-green-600 text-white px-2 py-1 text-xs mr-2 disabled:bg-gray-600"
          onClick={() => setFilter("success")}
          disabled={filter === "success"}
        >
          Success
        </button>
        <button
          className="rounded-full border bg-red-600 text-white px-2 py-1 text-xs disabled:bg-gray-600"
          onClick={() => setFilter("failure")}
          disabled={filter === "failure"}
        >
          Failed
        </button>
      </div>
      {workflows?.map((workflow) => (
        <Workflow key={workflow.id} workflow={workflow}></Workflow>
      ))}
    </div>
  );
};

export default Workflows;
