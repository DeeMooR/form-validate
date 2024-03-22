import { Navigate, Route, Routes } from 'react-router-dom';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import './App.css'

function App() { 
    return (
        <>
            <Routes>
                <Route path='/' element={<Step1 />} />
                <Route path='/step2' element={<Step2 />} />
                <Route path='*' element={<Navigate to='/'/>} />
            </Routes>
        </>
    );
}

export default App;
