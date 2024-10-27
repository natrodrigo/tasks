import Header from "./components/Header";
import { useEffect, useState } from "react";
import CardColumn from "./components/CardColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import jsonCards from "./utils/cards.json";
import jsonColumns from "./utils/columns.json";
import { useSupabase } from "./context/supabaseContext";
import ITask from "./types/ITask";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [tasks, setTasks] = useState(jsonCards);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabase();

  useEffect(() => {
    const getData = async () => {
      if (supabase) {
        const { data, error } = await supabase.from("tasks").select("*");
        if (error) {
          toast.error(
            `Erro ao buscar dados de tarefas:${error.message || " "}`
          );
          console.error(error);
          setLoading(false);
          return;
        }
        if (!data?.length) {
          toast(`Sem dados`);
          setLoading(false);
          return;
        }
        setTasks(data);
        setLoading(false);
      }
    };
    getData();
  }, [supabase]);

  const onMoveCard = async ({ updatedTask }: { updatedTask: ITask }) => {
    const task = tasks.find((card) => card.id === updatedTask.id);
    if (!task || task?.statusId === updatedTask.statusId) {
      return;
    }
    const newCards = [
      ...tasks.filter((task) => task.id !== updatedTask.id),
      updatedTask,
    ];
    setTasks(newCards);
    if (supabase) {
      const toastId = toast.loading("Carregando...");
      const { error } = await supabase
        .from("tasks")
        .update({ statusId: updatedTask.statusId }) // Dados a serem atualizados
        .eq("id", updatedTask.id);

      if (error) {
        toast.error(`Erro ao atualizar card: ${error.message || " "}`, {
          id: toastId,
        });
        console.error(error);
        return;
      }
      toast.success(`Card editado com sucesso!`, {
        id: toastId,
      });
    }
  };

  const handleOnCreateTask = async (
    event: React.FormEvent<HTMLFormElement>,
    statusId: number,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    event.preventDefault();
    const toastId = toast.loading("Criando tarefa...");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { title, description } = data as unknown as ITask;
    const newTask = { title, description, statusId } as ITask;
    if (!newTask.title) {
      toast.error("O título é obrigatório", {
        id: toastId,
      });
      return;
    }
    if (!supabase) {
      toast.error("Não foi possível conectar com servidor", {
        id: toastId,
      });
      return;
    }
    const { error } = await supabase.from("tasks").insert(newTask);
    if (error) {
      toast.error(`Erro ao criar tarefa: ${error.name}`, {
        id: toastId,
      });
      return;
    }
    setTasks((prev) => [...prev, newTask]);
    setIsDropdownOpen(false);
    toast.success(`Tarefa criada com sucesso`, {
      id: toastId,
    });
  };

  const handleOnDeleteTask = async (id: number) => {
    const toastId = toast.loading("Deletando...");
    if (!supabase) {
      toast.error("Não foi possível conectar com servidor", {
        id: toastId,
      });
      return;
    }
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast.error(`Erro ao deletar tarefa: ${error.name}`, {
        id: toastId,
      });
      return;
    }
    toast.success(`Tarefa deletada com sucesso`, {
      id: toastId,
    });
    setTasks((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Toaster position="bottom-left" />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex flex-col py-4 px-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-900 dark:text-emerald-400">
            Tarefas
          </h2>
        </div>
        <div className="grid grid-flow-col auto-cols-fr gap-4">
          <DndProvider backend={HTML5Backend}>
            {!loading &&
              jsonColumns.map((column) => {
                return (
                  <CardColumn
                    key={column.id}
                    cards={tasks.filter(
                      (task) => task.statusId === column.statusId
                    )}
                    title={column.title}
                    statusId={column.statusId}
                    onMoveCard={onMoveCard}
                    handleOnCreateTask={handleOnCreateTask}
                    handleOnDeleteTask={handleOnDeleteTask}
                  />
                );
              })}
            {loading && <div>Carregando</div>}
          </DndProvider>
        </div>
      </main>
      <footer className=" py-6 px-4 flex justify-center bg-white dark:bg-slate-800">
        <p className="text-gray-600 text-center dark:text-gray-300">
          Esta é uma página fictícia.
        </p>
      </footer>
    </div>
  );
}

export default App;
