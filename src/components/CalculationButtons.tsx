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
        className='bg-primary bg-primary-hover text-white rounded-lg p-2 sm:p-3 w-full font-bold text-base sm:text-lg shadow-md hover-scale'
      >
        {showCalculation ? '🔄 Re-Calculate' : '🧮 Calculate'}
      </button>

      {showCalculation && (
        <button 
          onClick={onReset}
          className='bg-neutral bg-neutral-hover text-white rounded-lg p-2 sm:p-3 w-full font-bold text-base sm:text-lg shadow-md hover-scale'
        >
          🔄 Reset
        </button>
      )}
    </div>
  );
};