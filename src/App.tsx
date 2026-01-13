// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Text } from './components/Text'
import { SectionTitle } from './components/SectionTitle'
import { NameForm } from './components/forms/NameForm'
import { useState } from 'react'

function App() {

  const MAX_TABLEMATES = 20;

  const [tablemates, setTablemates] = useState<string[]>([]);

  const handleAddName = (name : string) => {
    if (tablemates.length >= MAX_TABLEMATES) {
      alert(`Maximum ${MAX_TABLEMATES} tablemates allowed!`);
      return;
    }
    setTablemates([...tablemates, name]);
    console.log("Name Added:", name);
  }
  
  const handleDeleteName = (index : number) => {
    setTablemates(tablemates.filter((_, i) => i !== index));
    console.log("Name Deleted at index:", index);
  }
 
  return (
    <div className="min-h-screen flex flex-col">
      <header className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Group Meal Splitter" className="text-3xl text-white"/>
      </header>

      <main className='bg-white text-center flex-1'>
        
        {/* Tablemates Section */}

        <SectionTitle text={`Tablemates (Max : ${MAX_TABLEMATES})`}/>
        <NameForm
          onSubmit={handleAddName}
          buttonText='Add Tablemate'
          placeholder='Enter Tablemate Name'
        />

        <div className='flex flex-col max-h-70 overflow-y-auto'>
          {tablemates.map((tablemate, index) => (
            <div key={index} className='flex items-center bg-blue-500 rounded p-2 my-1 mx-2'>
              <Text text={tablemate} className="text-lg text-white flex-1" />
              <button 
                onClick={() => handleDeleteName(index)}
                className='bg-red-500 text-white px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </main>

      <footer className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-white"/>
      </footer>
    </div>
  )
}

export default App
