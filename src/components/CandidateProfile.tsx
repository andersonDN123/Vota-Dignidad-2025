import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { candidates } from '../data/candidates';
import { saveVote } from '../utils/storage';

export default function CandidateProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const candidate = candidates.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) {
    return <div>Candidato no encontrado</div>;
  }

  const handleVote = () => {
    const voter = JSON.parse(localStorage.getItem('currentVoter') || '{}');
    
    saveVote({
      voterId: voter.dni,
      candidateId: candidate.id,
      timestamp: Date.now()
    });

    navigate('/thanks');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a la lista
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">
            {candidate.name}
          </h1>
          
          <p className="text-gray-600 text-center mb-8 italic">
            "{candidate.slogan}"
          </p>

          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'overview'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Resumen
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'team'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('team')}
            >
              Equipo
            </button>
          </div>

          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Propuestas Principales:</h2>
              <div className="grid gap-4">
                {candidate.team.map((member, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-600">{member.role}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.name}</p>
                    <ul className="list-disc list-inside space-y-1">
                      {member.proposals.map((proposal, idx) => (
                        <li key={idx} className="text-gray-700">{proposal}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Equipo de Trabajo
              </h2>
              <div className="grid gap-4">
                {candidate.team.map((member, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-green-600">{member.role}</h3>
                      <p className="text-lg font-medium">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleVote}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
            >
              Votar por {candidate.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}