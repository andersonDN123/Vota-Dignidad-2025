import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { saveMessage, getMessages } from '../utils/storage';
import { MessageSquare } from 'lucide-react';

export default function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentVoter = JSON.parse(localStorage.getItem('currentVoter') || '{}');

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      author: currentVoter.name || 'Anónimo',
      timestamp: Date.now()
    };

    saveMessage(message);
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <MessageSquare className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-2xl font-bold text-green-600">Muro de Mensajes</h2>
      </div>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 mb-2">{message.text}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{message.author}</span>
              <span>{new Date(message.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Deja un mensaje para la posteridad..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          rows={3}
          maxLength={280}
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Publicar Mensaje
        </button>
      </form>
    </div>
  );
}