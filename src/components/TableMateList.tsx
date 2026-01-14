import { Text } from './Text';

interface TablemateListProps {
  tablemates: string[];
  onDelete: (index: number) => void;
}

export const TableMateList = ({ tablemates, onDelete }: TablemateListProps) => {
  return (
    <div className='flex flex-col max-h-70 overflow-y-auto hide-scrollbar'>
      {tablemates.map((tablemate, index) => (
        <div key={index} className='flex items-center bg-blue-500 rounded p-2 my-1 mx-2'>
          <Text text={tablemate} className="text-lg text-white flex-1" />
          <button 
            onClick={() => onDelete(index)}
            className='bg-red-500 text-white px-3 py-1 rounded'
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};