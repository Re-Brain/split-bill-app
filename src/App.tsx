import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Text } from './components/Text'

function App() {
 

  return (
    <>
      <header className='bg-slate-800 p-3 w-full text-center'>
        <Text text="Hello World" className="text-3xl text-white"/>
      </header>

      <main className='bg-white p-1 text-center'>
        <Text text="Welcome to Split Bill App" className="text-lg-1 text-black"/>
      </main>

      <footer className='bg-slate-100 p-3 w-full text-center'>
        <Text text="Thank you for using my service" className="text-xs-1 text-black"/>
      </footer>

      
    </>
  )
}

export default App
