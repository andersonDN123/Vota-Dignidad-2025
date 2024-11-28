import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Vote } from 'lucide-react';
import VoterForm from './components/VoterForm';
import CandidateList from './components/CandidateList';
import CandidateProfile from './components/CandidateProfile';
import AdminPanel from './components/AdminPanel';
import ThankYou from './components/ThankYou';
import MessageWall from './components/MessageWall';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center text-green-600">
                <Vote className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">VotaDignidad2025</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  to="/messages"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Mensajes
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<VoterForm />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/candidate/:id" element={<CandidateProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/thanks" element={<ThankYou />} />
            <Route path="/messages" element={<MessageWall />} />
          </Routes>
        </main>

        <footer className="bg-green-600 text-white text-center py-4 mt-auto">
          <p>Creado por Anderson Acuña Francia desde 5° A</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;