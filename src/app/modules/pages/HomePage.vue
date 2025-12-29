<!-- <template>
  <div class="page">
    <h1>Lista de Tarefas</h1>

    <section class="list">
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <div class="task-head">
            <strong :class="{ done: task.completed }">{{ task.title }}</strong>
            <small>{{ formatDate(task.createdAt) }}</small>
          </div>
          <p v-if="task.description">{{ task.description }}</p>
        </li>
      </ul>
      <div v-if="tasks.length === 0">
        <em>Nenhuma tarefa encontrada.</em>
      </div>
    </section>
  </div>
</template> -->

<template>
  <section class="flex flex-col gap-4 page">
    <div>
      <h1 class="text-lg font-black">Lista de Tarefas</h1>
    </div>
    <div v-for="task in tasks" :key="task.id">
      <Card class="task-card p-4">
        <template #title>{{ task.title }}</template>
        <template #content>
          <p class="m-0">
            {{ task.description }}
          </p>
        </template>
        <template #footer>
          <div class="flex gap-6 items-center mt-2">
            <div class="flex items-center gap-2">
              <i
                :class="{
                  'pi pi-circle-fill text-green-400':
                    task.status === 'Completed',
                  'pi pi-clock text-yellow-400': task.status === 'Pending',
                  'pi pi-hourglass text-blue-400':
                    task.status === 'In Progress',
                }"
              ></i>
              <strong
                :class="{
                  'text-green-400': task.status === 'Completed',
                  'text-yellow-400': task.status === 'Pending',
                  'text-blue-400': task.status === 'In Progress',
                }"
              >
                {{ task.status }}
              </strong>
            </div>
            <div class="flex items-center gap-2">
              <i class="pi pi-calendar"></i>
              <small>
                {{ formatDate(task.createdAt) }}
              </small>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<script setup></script>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useTasksStore } from "../store/tasks";
import Card from "primevue/card";

const store = useTasksStore();

onMounted(() => {
  store.fetchTasks().catch((e) => console.error("Failed to fetch tasks", e));
});

const tasks = computed(() => store.all);

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  const s = dateStr.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  let normalized = s.replace(/^([0-9]{4}-[0-9]{2}-[0-9]{2})\s+/, "$1T");
  normalized = normalized.replace(/(\.\d{3})\d+/, "$1");

  const dt = new Date(normalized);
  if (isNaN(dt.getTime())) {
    const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : s;
  }

  return dt.toISOString().slice(0, 10);
}
</script>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem;
}
.list ul {
  list-style: none;
  padding: 0;
}
.list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.task-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.done {
  text-decoration: line-through;
  opacity: 0.75;
}

.task-card {
  background-color: #18181a;
  color: #ffffff;
}
</style>
