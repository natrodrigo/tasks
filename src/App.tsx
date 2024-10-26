import Header from "./components/Header";
import { useEffect, useState } from "react";
import CardColumn from "./components/CardColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import jsonCards from "./utils/cards.json";
import jsonColumns from "./utils/columns.json";
import { useSupabase } from "./context/supabaseContext";
import ICard from "./utils/ICard";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cards, setCards] = useState(jsonCards);
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
        setCards(data);
        setLoading(false);
      }
    };
    getData();
  }, [supabase]);

  const onMoveCard = async ({ updatedCard }: { updatedCard: ICard }) => {
    const card = cards.find((card) => card.id === updatedCard.id);
    if (!card || card?.statusId === updatedCard.statusId) {
      return;
    }
    const newCards = [
      ...cards.filter((card) => card.id !== updatedCard.id),
      updatedCard,
    ];
    setCards(newCards);
    if (supabase) {
      const toastId = toast.loading("Loading...");
      const { error } = await supabase
        .from("tasks")
        .update({ statusId: updatedCard.statusId }) // Dados a serem atualizados
        .eq("id", updatedCard.id);

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
                    title={column.title}
                    key={column.id}
                    statusId={column.statusId}
                    onMoveCard={onMoveCard}
                    cards={cards.filter(
                      (card) => card.statusId === column.statusId
                    )}
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
