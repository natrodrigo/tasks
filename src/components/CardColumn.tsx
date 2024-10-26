import ICard from "../utils/ICard";
import Card from "./Card";
import { useDrop } from "react-dnd";

interface IProps {
  title: string;
  cards: ICard[];
  statusId: number;
  onMoveCard: ({ updatedCard }: { updatedCard: ICard }) => void;
}
export default function CardColumn({
  title,
  cards,
  statusId,
  onMoveCard,
}: IProps) {
  const [, dropRef] = useDrop({
    accept: "card",
    drop: (updatedCard: ICard) => {
      onMoveCard({ updatedCard: { ...updatedCard, statusId: statusId } });
    },
  });

  return (
    <div
      ref={dropRef}
      className="rounded-lg flex flex-col p-4 gap-4 grow bg-white dark:bg-slate-800"
    >
      <h2 className="text-3xl text-center font-bold text-teal-900 dark:text-emerald-400">
        {title}
      </h2>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            statusId={card.statusId}
            description={card.description}
          />
        );
      })}
    </div>
  );
}
