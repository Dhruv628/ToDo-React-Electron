import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import ConfirmationPage from './components/ConfirmationPage';
import PerformanceGraph from './components/PerformanceGraph ';
import getRandomQuote from './components/GetRandomQuote';

function App() {
  
useEffect(() => {
  getRandomQuote();
}, [])

  return (
 <>
<div className=' py-10 App bg-gradient-to-r from-[#02AABD] min-h-screen to-[#00CDAC]'>
 <Router >
  <Routes>
  <Route exact path="/" element={< TodoForm/>}  ></Route> 
  <Route exact path="/confirmation" element={< ConfirmationPage/>}  ></Route>
  <Route exact path="/performance" element={< PerformanceGraph/>}  ></Route>
  </Routes>
</Router>  
</div>
 
    </> 
  );
}

export default App;
