import Dexie from "dexie";

export const db = new Dexie("q-db");
db.version(1).stores({
  projects: "id, name, user_id",
  workflows: "id, created_at, created_by_user, project_id, status",
  users: "id, name, email",
  jobs: "id, created_at, duration_secconds, stage, status, workflow_id",
  traces: "id, job_id, offset, size, content",
});
