import React, { useState } from 'react';
import { getVotes, getVoters, clearAllData } from '../utils/storage';
import { candidates } from '../data/candidates';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dignidad2025') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const calculateResults = () => {
    const votes = getVotes();
    const results = candidates.map(candidate => {
      const voteCount = votes.filter(vote => vote.candidateId === candidate.id).length;
      return {
        ...candidate,
        votes: voteCount,
        percentage: votes.length ? ((voteCount / votes.length) * 100).toFixed(1) : '0'
      };
    });
    return results.sort((a, b) => b.votes - a.votes);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="admin-gradient p-8 rounded-lg shadow-xl text-white">
          <h1 className="text-3xl font-bold text-center mb-8">Panel Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese la contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Acceder al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  const results = calculateResults();
  const totalVoters = getVoters().length;
  const totalVotes = getVotes().length;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800">Panel de Control</h1>
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Votantes</h3>
          <p className="text-3xl font-bold text-blue-600">{totalVoters}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Votos Emitidos</h3>
          <p className="text-3xl font-bold text-green-600">{totalVotes}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Participación</h3>
          <p className="text-3xl font-bold text-purple-600">
            {totalVoters ? ((totalVotes / totalVoters) * 100).toFixed(1) : '0'}%
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Resultados por Candidato</h2>
        {results.map(candidate => (
          <div key={candidate.id} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{candidate.name}</h3>
                  <p className="text-gray-600 italic">"{candidate.slogan}"</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{candidate.votes}</p>
                <p className="text-lg text-gray-600">votos ({candidate.percentage}%)</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${candidate.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-8">
        <button
          onClick={clearAllData}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Reiniciar Sistema de Votación
        </button>
      </div>
    </div>
  );
}