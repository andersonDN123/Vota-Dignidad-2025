import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { candidates } from '../data/candidates';

export default function CandidateList() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>
      </div>

      <h1 className="text-2xl font-bold text-green-600 text-center mb-8">
        Lista de Candidatos
      </h1>

      <div className="space-y-6">
        {candidates.map(candidate => (
          <div
            key={candidate.id}
            onClick={() => navigate(`/candidate/${candidate.id}`)}
            className="flex items-center p-6 bg-white border-2 border-green-500 rounded-lg cursor-pointer hover:bg-green-50 transition-colors shadow-md"
          >
            <img
              src={candidate.photo}
              alt={`Logo de ${candidate.name}`}
              className="w-24 h-24 object-contain mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-2">{candidate.name}</h2>
              <p className="text-gray-600 italic">"{candidate.slogan}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}