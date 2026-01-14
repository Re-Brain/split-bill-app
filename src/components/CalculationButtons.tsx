interface CalculationButtonsProps {
  showCalculation: boolean;
  onCalculate: () => void;
  onReset: () => void;
}

export const CalculationButtons = ({ showCalculation, onCalculate, onReset }: CalculationButtonsProps) => {
  return (
    <div className='flex flex-col sm:flex-row justify-center gap-2 m-2 max-w-md sm:max-w-2xl mx-auto'>
      <button 
        onClick={onCalculate}
        className='bg-slate-800 text-white rounded p-2 sm:p-3 hover:bg-slate-700 w-full font-bold text-base sm:text-lg'
      >
        {showCalculation ? 'Re-Calculate' : 'Calculate'}
      </button>

      {showCalculation && (
        <button 
          onClick={onReset}
          className='bg-slate-600 text-white rounded p-2 sm:p-3 hover:bg-slate-500 w-full font-bold text-base sm:text-lg'
        >
          Reset
        </button>
      )}
    </div>
  );
};