type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({setIsModalOpen}: Props) => {
  return (
    <div className="fixed h-screen w-screen flex items-center justify-center bg-gray-500/20">
      <div className="min-h-80 min-w-80 bg-white">
        Teste
      </div>
    </div>
  );
};
