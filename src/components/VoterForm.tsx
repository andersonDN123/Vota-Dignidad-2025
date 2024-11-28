import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasVoted, saveVoter } from '../utils/storage';
import { Voter } from '../types';

export default function VoterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Voter>({
    dni: '',
    name: '',
    birthDate: '',
    grade: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasVoted(formData.dni)) {
      alert('Ya has votado anteriormente.');
      return;
    }

    saveVoter(formData);
    navigate('/candidates');
  };

  const isFormValid = () => {
    return (
      formData.dni.length === 8 &&
      formData.name.trim() !== '' &&
      formData.birthDate !== '' &&
      formData.grade !== ''
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
        Elecciones Escolares 2025
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            DNI (8 dígitos)
          </label>
          <input
            type="text"
            maxLength={8}
            pattern="[0-9]{8}"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.dni}
            onChange={e => setFormData({ ...formData, dni: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.birthDate}
            onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grado y sección
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.grade}
            onChange={e => setFormData({ ...formData, grade: e.target.value })}
          >
            <option value="">Seleccione</option>
            {['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'].map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </form>
    </div>
  );
}