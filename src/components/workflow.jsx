import { useState, useContext } from "react";
import Jobs from "./jobs";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { ColorsContext } from "../main";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/20/solid";
import moment from "moment";

const Workflow = ({ workflow }) => {
  const colors = useContext(ColorsContext);
  const [showJobs, setShowJobs] = useState(false);

  const user = useLiveQuery(() =>
    db.users.get({ id: workflow.created_by_user })
  );
  const project = useLiveQuery(() =>
    db.projects.get({ id: workflow.project_id })
  );
  return (
    <div className="flex flex-col bg-platinum rounded-3xl p-4 pt-6 my-6 border-4 border-rich-black hover:border-dazzled-blue transition text-rich-black relative">
      <div className="rounded-full font-bold absolute bg-platinum top-[-15px] border-2 border-rich-black text-xs py-1 px-2">
        {project?.name}
      </div>
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => setShowJobs(!showJobs)}
      >
        <div className="flex flex-row items-center">
          <div
            className={`w-4 h-4 rounded-full mr-4`}
            style={{ backgroundColor: colors[workflow.status] }}
          ></div>

          <div>
            <span className="font-bold text-oxford-blue">Workflow:</span>{" "}
            {workflow.id}
            <div className="flex items-center">
              <ClockIcon width={14} className="text-oxford-blue mr-1" />
              <span className="text-sm text-oxford-blue">
                {workflow.duration_secconds}
                <span className="italic text-xs">(s)</span>
              </span>
            </div>
            <div className="flex items-center">
              <CalendarDaysIcon width={14} className="text-oxford-blue mr-1" />
              <span className="text-sm text-oxford-blue">
                {moment(workflow.created_at).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-oxford-blue">
          <span className="font-bold">{user?.name}</span>
          <span className="italic text-xs">({user?.email})</span>
        </div>
      </div>
      <div>{showJobs ? <Jobs id={workflow.id} /> : null}</div>
    </div>
  );
};

export default Workflow;
