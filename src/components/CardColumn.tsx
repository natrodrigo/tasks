import ITask from "../types/ITask";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa6";
import {
  useFloating,
  useDismiss,
  flip,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import Dropdown from "./Dropdown";

interface IProps {
  title: string;
  cards: ITask[];
  statusId: number;
  onMoveCard: ({ updatedTask }: { updatedTask: ITask }) => void;
  handleOnCreateTask: (
    event: React.FormEvent<HTMLFormElement>,
    statusId: number,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  handleOnDeleteTask: (id: number) => void;
}
export default function CardColumn({
  title,
  cards,
  statusId,
  onMoveCard,
  handleOnCreateTask,
  handleOnDeleteTask,
}: IProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isDropdownOpen,
    onOpenChange: setIsDropdownOpen,
    placement: "bottom-end",
    middleware: [flip()],
  });

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  const [, dropRef] = useDrop({
    accept: "card",
    drop: (updatedTask: ITask) => {
      onMoveCard({ updatedTask: { ...updatedTask, statusId: statusId } });
    },
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const dropdownContent = (
    <form
      className="flex flex-col gap-2 py-2"
      onSubmit={(event) =>
        handleOnCreateTask(event, statusId, setIsDropdownOpen)
      }
    >
      <label htmlFor="title" className="text-gray-100">
        Título
      </label>
      <input id="title" name="title" type="text" className="rounded p-1" />
      <label htmlFor="description" className="text-gray-100">
        Descrição
      </label>
      <textarea
        id="description"
        name="description"
        className="rounded p-1"
        rows={8}
      />
      <button
        type="submit"
        className="mt-2 rounded border border-slate-400 text-white hover:border-emerald-400"
      >
        Criar
      </button>
    </form>
  );
  return (
    <>
      {isDropdownOpen && (
        <Dropdown
          ref={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
        >
          {dropdownContent}
        </Dropdown>
      )}

      <div
        ref={dropRef}
        className="rounded-lg flex flex-col pt-2 p-4 grow bg-white dark:bg-slate-800"
      >
        <div className="flex justify-between mb-2 ">
          <h2 className="overflow-hidden text-ellipsis text-2xl text-center font-bold text-teal-900 dark:text-emerald-400">
            {title}
          </h2>
          <div
            ref={refs.setReference}
            onClick={toggleDropdown}
            className="p-1 cursor-pointer rounded place-self-end text-black dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-500"
            {...getReferenceProps()}
          >
            <FaPlus />
          </div>
        </div>

        <div className="gap-4 flex flex-col">
          {cards.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                statusId={card.statusId}
                createDate={card.createDate}
                description={card.description}
                handleOnDeleteTask={handleOnDeleteTask}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
