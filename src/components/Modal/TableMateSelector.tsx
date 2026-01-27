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
      <h2 className='text-xl sm:text-2xl font-bold mb-4' style={{color: 'var(--color-text)'}}>Select Tablemates</h2>
      
      <div className='max-h-60 sm:max-h-80 overflow-y-auto mb-4'>
        {tablemates.map((name, index) => (
          <div
            key={index}
            className='flex items-center p-2 sm:p-3 mb-2 rounded cursor-pointer'
            style={{backgroundColor: 'var(--color-neutral-light)'}}
            onClick={() => onToggle(name)}
          >
            <input
              type='checkbox'
              checked={tempSelected.includes(name)}
              onChange={() => onToggle(name)}
              className='mr-3 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer'
              style={{accentColor: 'var(--color-primary)'}}
            />
            <span className='text-sm sm:text-base' style={{color: 'var(--color-text)'}}>{name}</span>
          </div>
        ))}
      </div>

      <div className='flex gap-2 mb-4'>
        <button
          onClick={onSelectAll}
          className='bg-neutral bg-neutral-hover text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base flex-1 shadow-md hover-scale'
        >
          ✔️ Select All
        </button>
        <button
          onClick={onUnselectAll}
          className='bg-neutral bg-neutral-hover text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base flex-1 shadow-md hover-scale'
        >
          ❌ Unselect All
        </button>
      </div>

      <button
        onClick={onSave}
        className='bg-primary bg-primary-hover text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full text-base sm:text-lg font-bold shadow-lg hover-scale'
      >
        💾 Save
      </button>
    </>
  );
};