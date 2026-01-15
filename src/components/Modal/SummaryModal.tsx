interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

interface SummaryModalProps {
  bill: PersonBill | null;
  tax: number;
  serviceCharge: number;
  totalTablemates: number;
}

export const SummaryModal = ({ bill, tax, serviceCharge, totalTablemates }: SummaryModalProps) => {
  if (!bill) return null;

  const taxPerPerson = totalTablemates > 0 ? tax / totalTablemates : 0;
  const serviceChargePerPerson = totalTablemates > 0 ? serviceCharge / totalTablemates : 0;
  const foodTotal = bill.items.reduce((sum, item) => sum + item.pricePerPerson, 0);

  return (
    <>
      <h2 className='text-xl sm:text-2xl font-bold mb-4 text-slate-800'>Summary for {bill.name}</h2>
      
      {/* Food Items Breakdown */}
      <div className='mb-4'>
        <h3 className='text-base sm:text-lg font-semibold text-slate-800 mb-2'>Food & Drinks:</h3>
        <div className='max-h-64 overflow-y-auto'>
          {bill.items.length > 0 ? (
            bill.items.map((item, index) => (
              <div key={index} className='flex justify-between items-center p-2 bg-slate-100 rounded mb-2'>
                <span className='text-slate-800 flex-1 text-sm sm:text-base'>{item.foodDrink}</span>
                <span className='text-slate-800 font-semibold text-sm sm:text-base'>{item.pricePerPerson.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className='text-slate-600 text-sm sm:text-base'>No food items</p>
          )}
        </div>
        <div className='flex justify-between items-center p-2 mt-2 border-t-2 border-slate-300'>
          <span className='text-slate-800 font-semibold text-sm sm:text-base'>Food Subtotal:</span>
          <span className='text-slate-800 font-semibold text-sm sm:text-base'>{foodTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Tax and Service Charge */}
      <div className='mb-4'>
        <h3 className='text-base sm:text-lg font-semibold text-slate-800 mb-2'>Additional Charges:</h3>
        {tax > 0 && (
          <div className='flex justify-between items-center p-2 bg-slate-100 rounded mb-2'>
            <span className='text-slate-800 text-sm sm:text-base'>Tax (split among {totalTablemates})</span>
            <span className='text-slate-800 font-semibold text-sm sm:text-base'>{taxPerPerson.toFixed(2)}</span>
          </div>
        )}
        {serviceCharge > 0 && (
          <div className='flex justify-between items-center p-2 bg-slate-100 rounded mb-2'>
            <span className='text-slate-800 text-sm sm:text-base'>Service Charge (split among {totalTablemates})</span>
            <span className='text-slate-800 font-semibold text-sm sm:text-base'>{serviceChargePerPerson.toFixed(2)}</span>
          </div>
        )}
        {tax === 0 && serviceCharge === 0 && (
          <p className='text-slate-600 text-sm sm:text-base'>No additional charges</p>
        )}
      </div>

      {/* Total */}
      <div className='flex justify-between items-center p-3 bg-slate-800 rounded'>
        <span className='text-white text-lg sm:text-xl font-bold'>Total:</span>
        <span className='text-white text-lg sm:text-xl font-bold'>{bill.total.toFixed(2)}</span>
      </div>

      {/* Breakdown Formula */}
      <div className='mt-4 p-3 bg-slate-50 rounded text-xs sm:text-sm text-slate-700'>
        <p className='font-semibold mb-1'>Calculation:</p>
        <p>{foodTotal.toFixed(2)} (food) + {taxPerPerson.toFixed(2)} (tax) + {serviceChargePerPerson.toFixed(2)} (service) = {bill.total.toFixed(2)}</p>
      </div>
    </>
  );
};