import { useDrag } from "react-dnd";

interface IProps {
  id: number;
  title: string;
  statusId: number;
}

export default function Card({ id, title, statusId }: IProps) {
  const card = { id, title, statusId };
  const [, dragRef] = useDrag({
    type: "card",
    item: card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className="rounded-lg px-4 py-1 flex flex-col border border-gray-600 hover:border-emerald-700 bg-white dark:bg-gray-700"
    >
      <span className="text-center mb-2 text-xl font-medium text-gray-800 dark:text-white">
        {title}
      </span>
      <span className="text-sm font-medium text-gray-800 dark:text-white">
        Descrição da minha tarefa, descrição da minha tarefa, descrição da minha
        tarefa.
      </span>
    </div>
  );
}
