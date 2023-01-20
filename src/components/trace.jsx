import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

const Trace = ({ id }) => {
  const trace = useLiveQuery(() => db.traces.get({ job_id: id }), [id]);
  return (
    <div className="ml-2 p-2 w-full h-auto text-platinum bg-oxford-blue rounded-xl overflow-scroll text-sm">
      ${trace?.id}: {trace?.content}
    </div>
  );
};

export default Trace;
