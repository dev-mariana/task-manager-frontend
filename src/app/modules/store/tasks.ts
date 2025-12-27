import { defineStore } from "pinia";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

const API_BASE = "http://localhost:3000/tasks";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),

  getters: {
    all: (state) => state.tasks,
    completedCount: (state) => state.tasks.filter((t) => t.completed).length,
    remainingCount: (state) => state.tasks.filter((t) => !t.completed).length,
  },

  actions: {
    async fetchTasks() {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch tasks: ${res.status} ${res.statusText}`
          );
        }
        const data = (await res.json()) as any[];
        const normalized = data.map((t) => ({
          id: t.id ?? t.uuid ?? String(t._id ?? ""),
          title: t.title ?? "",
          description: t.description ?? t.desc ?? undefined,
          completed:
            typeof t.completed === "boolean" ? t.completed : !!t.completed,
          createdAt: t.created_at ?? t.createdAt ?? t.createdAtRaw ?? "",
        })) as Task[];
        this.tasks = normalized;
        return this.tasks;
      } catch (e) {
        console.error("fetchTasks error", e);
        this.tasks = [];
        throw e;
      }
    },

    async createTask(payload: { title: string; description?: string }) {
      try {
        const res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(
            `Failed to create task: ${res.status} ${res.statusText}`
          );
        }
        const created = (await res.json()) as Task;
        this.tasks.unshift(created);
        return created;
      } catch (e) {
        console.error("createTask error", e);
        throw e;
      }
    },
  },
});
