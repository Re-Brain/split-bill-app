import { SectionTitle } from './SectionTitle';
import { PriceCalculationTable } from './PriceCalculationTable';
import { CalculationButtons } from './CalculationButtons';

interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

interface PriceCalculationSectionProps {
  bills: PersonBill[];
  showCalculation: boolean;
  onCalculate: () => void;
  onReset: () => void;
  onOpenSummary: (name: string) => void;
}

export const PriceCalculationSection = ({
  bills,
  showCalculation,
  onCalculate,
  onReset,
  onOpenSummary
}: PriceCalculationSectionProps) => {
  return (
    <>
      <SectionTitle text="Price Calculation" />
      
      {showCalculation && (
        <PriceCalculationTable 
          bills={bills}
          onOpenSummary={onOpenSummary}
        />
      )}

      <CalculationButtons
        showCalculation={showCalculation}
        onCalculate={onCalculate}
        onReset={onReset}
      />
    </>
  );
};