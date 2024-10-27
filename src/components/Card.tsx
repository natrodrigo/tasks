import { useDrag } from "react-dnd";
import { FaTrashCan } from "react-icons/fa6";

interface IProps {
  id: number;
  title: string;
  statusId: number;
  createDate: string;
  description?: string;
  handleOnDeleteTask: (id: number) => void;
}

export default function Card({
  id,
  title,
  statusId,
  createDate,
  description = "",
  handleOnDeleteTask,
}: IProps) {
  const card = { id, title, statusId, createDate, description };
  const formatedCreateDate = new Date(createDate);
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
      className="group rounded-lg px-4 py-1 flex flex-col border border-gray-500 text-gray-800 bg-gray-50 dark:bg-gray-700 dark:text-white hover:border-emerald-700"
    >
      <span className="overflow-hidden text-ellipsis text-center mb-2 text-xl font-medium">
        {title}
      </span>
      <span className="overflow-hidden text-ellipsis text-sm font-medium">
        {description}
      </span>
      <div className="flex justify-between mt-4 text-xs">
        <div
          className="cursor-pointer opacity-0 group-hover:opacity-100 text-red-500"
          onClick={() => handleOnDeleteTask(id)}
        >
          <FaTrashCan />
        </div>
        <div>criado em: {formatedCreateDate.toLocaleDateString()}</div>
      </div>
    </div>
  );
}
