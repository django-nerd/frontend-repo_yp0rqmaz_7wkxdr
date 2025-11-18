import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import AdminPage from './AdminPage'
import NewsPage from './NewsPage'
import EventsPage from './EventsPage'
import VacanciesPage from './VacanciesPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
