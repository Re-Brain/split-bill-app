import { useState } from 'react'

import { Text } from './components/Text'
import { SectionTitle } from './components/SectionTitle'

import { NameForm } from './components/forms/NameForm'
import { FoodDrinkForm } from './components/forms/FoodDrinkForm'
import { ExtraChargeForm } from './components/forms/ExtraChargeForm'

import { Modal } from './components/Modal/Modal'
import { TableMateSelector } from './components/Modal/TableMateSelector'
import { SummaryModal } from './components/Modal/SummaryModal'

import { TableMateList } from './components/TableMateList'
import { FoodDrinkTable } from './components/FoodDrinkTable'
import { PriceCalculationSection } from './components/PriceCalculationSection'

import { useTableMateModal } from './hooks/useTableMateModal'
import { calculateBills } from './utils/billCalculator'

interface FoodDrinkItem {
  foodDrink: string;
  amount: number;
  price: number;
  sharedWith: string[];
}

interface PersonBill {
  name: string;
  total: number;
  items: {
    foodDrink: string;
    amount: number;
    pricePerPerson: number;
  }[];
}

function App() {
  const MAX_TABLEMATES = 20;
  const MAX_FOOD_DRINKS = 50;

  const [tablemates, setTablemates] = useState<string[]>([]);
  const [foodDrinks, setFoodDrinks] = useState<FoodDrinkItem[]>([]);
  const [tax, setTax] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const [bills, setBills] = useState<PersonBill[]>([]);
  const [showCalculation, setShowCalculation] = useState(false);
  
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<PersonBill | null>(null);

  const {
    modalOpen,
    tempSelected,
    openModal,
    closeModal,
    toggleTablemate,
    selectAll,
    unselectAll,
    saveSelection
  } = useTableMateModal(foodDrinks, setFoodDrinks, tablemates);

  const handleAddName = (name: string) => {
    if (tablemates.length >= MAX_TABLEMATES) {
      alert(`Maximum ${MAX_TABLEMATES} tablemates allowed!`);
      return;
    }
    setTablemates([...tablemates, name]);
  };

  const handleDeleteName = (index: number) => {
    const deletedName = tablemates[index];
    setTablemates(tablemates.filter((_, i) => i !== index));
    
    const updatedFoodDrinks = foodDrinks.map(item => ({
      ...item,
      sharedWith: item.sharedWith.filter(name => name !== deletedName)
    }));
    setFoodDrinks(updatedFoodDrinks);
  };

  const handleAddFoodAndDrink = (foodDrink: string, amount: number, price: number) => {
    if (foodDrinks.length >= MAX_FOOD_DRINKS) {
      alert(`Maximum ${MAX_FOOD_DRINKS} food and drinks allowed!`);
      return;
    }
    setFoodDrinks([...foodDrinks, { foodDrink, amount, price, sharedWith: [] }]);
  };

  const handleDeleteFoodDrink = (index: number) => {
    setFoodDrinks(foodDrinks.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    if (tablemates.length === 0) {
      alert("Please add at least one tablemate!");
      return;
    }
    if (foodDrinks.length === 0) {
      alert("Please add at least one food/drink item!");
      return;
    }

    const calculatedBills = calculateBills(foodDrinks, tablemates, tax, serviceCharge);
    setBills(calculatedBills);
    setShowCalculation(true);
  };

  const handleReset = () => {
    setBills([]);
    setShowCalculation(false);
  };

  const handleOpenSummary = (name: string) => {
    const bill = bills.find(b => b.name === name);
    if (bill) {
      setSelectedBill(bill);
      setSummaryModalOpen(true);
    }
  };

  const handleCloseSummary = () => {
    setSummaryModalOpen(false);
    setSelectedBill(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className='bg-gradient-primary p-3 sm:p-4 lg:p-6 w-full text-center shadow-lg shrink-0'>
        <Text text="🍽️ Pay YOURS Bill 🍽️" className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold"/>
      </header>

      <main className='text-center px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto w-full py-4'>
        <SectionTitle text={`👥 Tablemates (Max : ${MAX_TABLEMATES})`}/>
        <NameForm onSubmit={handleAddName} buttonText='Add' placeholder='Tablemate Name'/>
        <TableMateList tablemates={tablemates} onDelete={handleDeleteName}/>

        <SectionTitle text={`🍽️ Food & Drinks (Max : ${MAX_FOOD_DRINKS})`}/>
        <FoodDrinkForm
          onSubmit={handleAddFoodAndDrink}
          buttonText='Add'
          foodDrinkPlaceholder='Item'
          amountPlaceholder='Amount'
          pricePlaceholder='Price'
        />
        <FoodDrinkTable 
          foodDrinks={foodDrinks}
          onOpenModal={openModal}
          onDelete={handleDeleteFoodDrink}
        />

        <Modal isOpen={modalOpen} onClose={closeModal}>
          <TableMateSelector
            tablemates={tablemates}
            tempSelected={tempSelected}
            onToggle={toggleTablemate}
            onSelectAll={selectAll}
            onUnselectAll={unselectAll}
            onSave={saveSelection}
          />
        </Modal>

        <SectionTitle text={`💰 Tax (Optional)`}/>
        <ExtraChargeForm value={tax} onChange={setTax} placeholder='Tax (Optional)'/>

        <SectionTitle text={`💵 Service Charge (Optional)`}/>
        <ExtraChargeForm value={serviceCharge} onChange={setServiceCharge} placeholder='Service Charge (Optional)'/>

        <PriceCalculationSection
          bills={bills}
          showCalculation={showCalculation}
          onCalculate={handleCalculate}
          onReset={handleReset}
          onOpenSummary={handleOpenSummary}
        />

        <Modal isOpen={summaryModalOpen} onClose={handleCloseSummary}>
          <SummaryModal 
            bill={selectedBill}
            tax={tax}
            serviceCharge={serviceCharge}
            totalTablemates={tablemates.length}
          />
        </Modal>

      </main>

      <footer className='bg-gradient-primary p-5 sm:p-6 w-full text-center shadow-lg shrink-0 mt-auto'>
        <p className="text-sm sm:text-base text-white mt-2">
          Crafted by{' '}
          <a 
            href="https://github.com/Re-Brain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-yellow-200 transition-colors"
          >
            Re-Brain
          </a>
        </p>
        <p className="text-sm sm:text-base text-white mt-1">
          Spot an issue? Contact{' '}
          <a href="mailto:brainditthakit@gmail.com" className="underline hover:text-yellow-200 transition-colors">
            brainditthakit@gmail.com
          </a>
        </p>
      </footer>

    </div>
  )
}

export default App