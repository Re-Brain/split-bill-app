// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Text } from './components/Text'
import { SectionTitle } from './components/SectionTitle'
import { NameForm } from './components/forms/NameForm'

function App() {

  const handleAddName = (name : string) => {
    console.log("Name Added:", name);
  }
 
  return (
    <div className="min-h-screen flex flex-col">
      <header className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Group Meal Splitter" className="text-3xl text-white"/>
      </header>

      <main className='bg-white text-center flex-1'>
        
        {/* Tablemates Section */}
        <SectionTitle text="Tablemates (Max : 20)"/>
        <NameForm
          onSubmit={handleAddName}
          buttonText='Add Tablemate'
          placeholder='Enter Tablemate Name'
        />

      </main>

      <footer className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-white"/>
      </footer>
    </div>
  )
}

export default App
