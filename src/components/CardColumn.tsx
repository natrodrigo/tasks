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
  tasks: ITask[];
  statusId: number;
  onMoveTask: ({ updatedTask }: { updatedTask: ITask }) => void;
  handleOnCreateTask: (
    event: React.FormEvent<HTMLFormElement>,
    statusId: number,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  handleOnDeleteTask: (id: number) => void;
}
export default function CardColumn({
  title,
  tasks,
  statusId,
  onMoveTask,
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
      onMoveTask({ updatedTask: { ...updatedTask, statusId: statusId } });
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
      <label htmlFor="title" className="text-gray-950 dark:text-gray-100">
        Título
      </label>
      <input id="title" name="title" type="text" className="rounded p-1" />
      <label htmlFor="description" className="text-gray-950 dark:text-gray-100">
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
        className="mt-2 rounded border border-slate-400 text-gray-950 dark:text-gray-100 hover:border-emerald-400"
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
        className="rounded-lg flex flex-col pt-2 p-4 grow bg-gray-200 dark:bg-slate-800"
      >
        <div className="flex justify-between mb-2">
          <h2 className="overflow-hidden text-ellipsis text-2xl text-center font-bold text-teal-900 dark:text-emerald-400">
            {title}
          </h2>
          <div
            ref={refs.setReference}
            onClick={toggleDropdown}
            className="p-1 cursor-pointer rounded place-self-end text-black dark:text-gray-200 hover:bg-gray-300 hover:dark:bg-slate-600"
            {...getReferenceProps()}
          >
            <FaPlus />
          </div>
        </div>

        <div className="gap-4 flex flex-col">
          {tasks.map((task) => {
            return (
              <Card
                key={task.id}
                id={task.id}
                title={task.title}
                statusId={task.statusId}
                createDate={task.createDate}
                description={task.description}
                handleOnDeleteTask={handleOnDeleteTask}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
