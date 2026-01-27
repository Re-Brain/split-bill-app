interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

interface PriceCalculationTableProps {
  bills: PersonBill[];
  onOpenSummary: (name: string) => void;
}

export const PriceCalculationTable = ({ bills, onOpenSummary }: PriceCalculationTableProps) => {
  if (bills.length === 0) {
    return (
      <div className='text-gray-600 p-4 text-sm sm:text-base'>
        Please add tablemates and food items to calculate bills.
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl w-full px-2 sm:px-4'>
      <table className='w-full border-separate table-fixed' style={{ borderSpacing: '4px' }}>
        <thead>
          <tr>
            <th className='text-white bg-primary px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base shadow-md'>👤</th>
            <th className='text-white bg-primary px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base shadow-md'>💵 Total</th>
            <th className='text-white bg-primary px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base shadow-md'>📄 Summary</th>
          </tr>
        </thead>
      </table>
    
      <div className='max-h-60 sm:max-h-80 lg:max-h-96 overflow-y-auto hide-scrollbar'>
        <table className='w-full border-separate table-fixed' style={{ borderSpacing: '4px' }}>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={index} className='fade-in'>
                <td className='text-white bg-neutral px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base shadow-sm'>{bill.name}</td>
                <td className='text-white bg-neutral px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base shadow-sm'>{bill.total.toFixed(2)}</td>
                <td className='text-white bg-neutral px-1 sm:px-2 py-1 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base text-center shadow-sm'>
                  <button 
                    onClick={() => onOpenSummary(bill.name)}
                    className='bg-secondary bg-secondary-hover text-white px-2 py-1 rounded text-xs sm:text-sm hover-scale'
                  >
                    👁️ View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};