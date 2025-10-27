import React from 'react'
import Nav from './Nav'
import Aside from './Aside'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Bulkmail from './Bulkmail'
import FIlereader from './FIlereader'
import NotFound from './NotFound'

const App = () => {
  return (
    <div>
  <Router>
      <Nav/>
   <div className='flex'>
     <Aside/>
    <Routes>
      <Route path='/' element={<Bulkmail/>} />
      <Route path='/reader' element={<FIlereader/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
   </div>

  </Router>
    </div>
  )
}

export default App