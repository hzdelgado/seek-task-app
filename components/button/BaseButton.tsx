interface ButtonProps {
    onClick: () => void;
    isOutline?: boolean;
    children: React.ReactNode;
  }
  
  const BaseButton: React.FC<ButtonProps> = ({ onClick, children, isOutline = false }) => {
    return (
      <button
        className={`w-full h-12 bg-indigo-600 py-2 rounded-md hover:bg-indigo-700 transition-colors ${ isOutline? "bg-transparent text-indigo-700 hover:text-white  border border-blue-500" : "bg-indigo-600 text-white" }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default BaseButton;