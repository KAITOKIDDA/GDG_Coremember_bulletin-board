import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import ArticleCreate from './components/ArticleCreate';
import ArticleEdit from './components/ArticleEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/view/:id" element={<ArticleView />} />
        <Route path="/create" element={<ArticleCreate />} />
        <Route path="/edit/:id" element={<ArticleEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
