

interface IProps {
  title: string;
  imageLink: string;
  price: string;
}

export default function Card({ imageLink, title, price }: IProps) {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg dark:bg-slate-800">
      <span className="text-2xl font-medium text-gray-800 dark:text-white">{title}</span>
      <img
        src={imageLink}
        alt={title}
        className="my-4 h-56 w-full object-cover rounded-lg"
      />
      <p className="text-gray-600 dark:text-white">{price}</p>
    </div>
  );
}
