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

export const calculateBills = (
  foodDrinks: FoodDrinkItem[],
  tablemates: string[],
  tax: number,
  serviceCharge: number
): PersonBill[] => {
  // Initialize bills for each tablemate
  const bills: PersonBill[] = tablemates.map(name => ({
    name,
    total: 0,
    items: []
  }));


  // Calculate food costs for each person
  foodDrinks.forEach(item => {
    if (item.sharedWith.length === 0) return; // Skip items with no one assigned

    const totalItemCost = item.amount * item.price;
    const costPerPerson = totalItemCost / item.sharedWith.length;

    item.sharedWith.forEach(person => {
      const personBill = bills.find(b => b.name === person);
      if (personBill) {
        personBill.total += costPerPerson;
        personBill.items.push({
          foodDrink: item.foodDrink,
          amount: item.amount,
          pricePerPerson: costPerPerson
        });
      }
    });
  });

  // Add tax and service charge divided among all tablemates
  const taxPerPerson = tablemates.length > 0 ? tax / tablemates.length : 0;
  const serviceChargePerPerson = tablemates.length > 0 ? serviceCharge / tablemates.length : 0;

  bills.forEach(bill => {
    bill.total += taxPerPerson + serviceChargePerPerson;
  });

  return bills;
};