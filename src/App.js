import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LicenseValidation from './components/LicenseValidation/LicenseValidation';
import CompanySelection from './components/CompanySelection/CompanySelection';
import CompanyLogin from './components/CompanyLogin/CompanyLogin';
import BlankPage from './components/BlankPage/BlankPage';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<LicenseValidation />} />
                <Route path="/CompanySelection" element={<CompanySelection />} />
                <Route path="/CompanyLogin/:companyId" element={<CompanyLogin />} />
                <Route path="/BlankPage" element={<BlankPage />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
