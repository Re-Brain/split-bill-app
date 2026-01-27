import { Text } from './Text';

interface TablematesListProps {
  tablemates: string[];
  onDelete: (index: number) => void;
}

export const TableMateList = ({ tablemates, onDelete }: TablematesListProps) => {
  // Don't render if no tablemates
  if (tablemates.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col max-h-60 sm:max-h-80 lg:max-h-96 overflow-y-auto hide-scrollbar max-w-md sm:max-w-2xl mx-auto px-2 sm:px-0'>
      {tablemates.map((tablemate, index) => (
        <div key={index} className='flex items-center justify-between bg-neutral rounded-lg p-2 sm:p-3 my-1 shadow-md fade-in'>
          <Text text={tablemate} className="text-base sm:text-lg text-white ml-2" />
          <button 
            onClick={() => onDelete(index)}
            className='bg-danger bg-danger-hover text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base whitespace-nowrap hover-scale'
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};