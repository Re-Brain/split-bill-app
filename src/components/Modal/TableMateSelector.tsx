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
  return (
    <>
      <h2 className='text-xl sm:text-2xl font-bold mb-4 text-slate-800'>Select Tablemates</h2>
      
      <div className='max-h-60 sm:max-h-80 overflow-y-auto mb-4'>
        {tablemates.map((name, index) => (
          <div
            key={index}
            className='flex items-center p-2 sm:p-3 mb-2 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer'
            onClick={() => onToggle(name)}
          >
            <input
              type='checkbox'
              checked={tempSelected.includes(name)}
              onChange={() => onToggle(name)}
              className='mr-3 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-slate-600'
            />
            <span className='text-slate-800 text-sm sm:text-base'>{name}</span>
          </div>
        ))}
      </div>

      <div className='flex gap-2 mb-4'>
        <button
          onClick={onSelectAll}
          className='bg-slate-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-slate-500 flex-1'
        >
          Select All
        </button>
        <button
          onClick={onUnselectAll}
          className='bg-slate-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-slate-500 flex-1'
        >
          Unselect All
        </button>
      </div>

      <button
        onClick={onSave}
        className='bg-slate-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded w-full text-base sm:text-lg font-bold hover:bg-slate-700'
      >
        Save
      </button>
    </>
  );
};