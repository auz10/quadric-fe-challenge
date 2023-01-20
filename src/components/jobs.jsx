import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db } from "../../db";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Trace from "./trace";
import { useContext } from "react";
import { ColorsContext } from "../main";

const Jobs = ({ id }) => {
  const colors = useContext(ColorsContext);
  const [selected, setSelected] = useState(0);

  const jobs = useLiveQuery(() =>
    db.jobs.where("workflow_id").equals(id).toArray()
  );
  return (
    <div className="mx-8 mt-3 flex">
      <div className="flex flex-col">
        {jobs?.map((job) => (
          <div
            key={job.id}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center">
              <div
                className={`w-4 h-4 rounded-full mr-4 ${
                  job.status == "pending" && "animate-pulse"
                }`}
                style={{ backgroundColor: colors[job.status] }}
              ></div>
              <div className="font-bold mr-2 capitalize text-oxford-blue">
                {job.stage}:
              </div>{" "}
              <div
                className={`font-bold capitalize text-sm mr-4 ${
                  job.status == "pending" && "animate-pulse"
                }`}
                style={{ color: colors[job.status] }}
              >
                {job.status}
              </div>
            </div>
            <ArrowRightCircleIcon
              width={20}
              className={`hover:text-blue-600 cursor-pointer ${
                selected === job.id ? "text-blue-600" : "text-oxford-blue"
              }`}
              onClick={() => setSelected(job.id)}
            />
          </div>
        ))}
      </div>
      {selected !== null ? <Trace id={selected} /> : null}
    </div>
  );
};

export default Jobs;
