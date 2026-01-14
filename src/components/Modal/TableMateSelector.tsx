interface TableMateSelectorProps {
  tablemates: string[];
  tempSelected: string[];
  onToggle: (name: string) => void;
  onSelectAll: () => void;
  onUnselectAll: () => void;
  onSave: () => void;
}

export const TableMateSelector = ({
  tablemates,
  tempSelected,
  onToggle,
  onSelectAll,
  onUnselectAll,
  onSave
}: TableMateSelectorProps) => {
  if (tablemates.length === 0) {
    return <p className='text-gray-600 mb-4'>No tablemates added yet. Please add tablemates first.</p>;
  }

  return (
    <>
      <h2 className='text-xl font-bold mb-4 text-black'>Who shared this item?</h2>
      
      <div className='max-h-64 overflow-y-auto mb-4'>
        {tablemates.map((name, index) => (
          <div key={index} className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'>
            <input
              type='checkbox'
              id={`tablemate-${index}`}
              checked={tempSelected.includes(name)}
              onChange={() => onToggle(name)}
              className='w-4 h-4'
            />
            <label htmlFor={`tablemate-${index}`} className='text-black flex-1 cursor-pointer'>
              {name}
            </label>
          </div>
        ))}
      </div>

      <div className='flex gap-2 mb-4'>
        <button 
          onClick={onSelectAll}
          className='flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Select All
        </button>
        <button 
          onClick={onUnselectAll}
          className='flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
        >
          Unselect All
        </button>
      </div>

      <button 
        onClick={onSave}
        className='w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
      >
        Save Selection
      </button>
    </>
  );
};