import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import DetailView from './component/DetailView';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/details/:id' element={<DetailView/>}/>
            </Routes>
        </Router>
    );
};

export default App;
