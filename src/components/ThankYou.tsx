import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ¡Gracias por votar!
        </h1>
        <p className="text-gray-600">
          Tu voto ha sido registrado exitosamente.
        </p>
      </div>
    </div>
  );
}