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
        <div key={index} className='flex items-center justify-between bg-slate-800 rounded p-2 sm:p-3 my-1'>
          <Text text={tablemate} className="text-base sm:text-lg text-white ml-2" />
          <button 
            onClick={() => onDelete(index)}
            className='bg-slate-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base hover:bg-slate-500 whitespace-nowrap'
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};