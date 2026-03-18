import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'kurir', text: 'Halo! Saya Budi, kurir LAMBOE yang sedang mengantar paket Anda. Ada yang bisa dibantu?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    
    // Mock kurir reply
    setTimeout(() => {
      let reply = 'Baik, saya catat. Posisi saya sekarang sekitar 2km lagi.';
      if (currentInput.toLowerCase().includes('posisi') || currentInput.toLowerCase().includes('dimana')) {
        reply = 'Saya sedang menuju ke alamat tujuan, perkiraan 10 menit lagi sampai ya!';
      } else if (currentInput.toLowerCase().includes('titip')) {
        reply = 'Siap, nanti saya titip sesuai instruksi dan saya fotokan/videokan buktinya.';
      }
      setMessages(prev => [...prev, { sender: 'kurir', text: reply }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn-primary"
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
            width: '60px', height: '60px', borderRadius: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(255, 51, 102, 0.4)'
          }}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel" style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
          width: '350px', height: '500px', display: 'flex', flexDirection: 'column',
          padding: 0, overflow: 'hidden'
        }}>
          <div style={{ padding: '1.25rem', background: 'var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 10, height: 10, background: 'var(--success)', borderRadius: '50%', display: 'inline-block' }}></span>
                Kurir: Budi
              </h4>
             <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Sedang dalam pengantaran</p>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.4)' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                background: m.sender === 'user' ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 1rem',
                borderRadius: m.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                maxWidth: '80%',
                border: m.sender === 'user' ? '1px solid rgba(255, 51, 102, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{m.text}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem', background: 'var(--tertiary)', borderTop: '1px solid var(--glass-border)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" className="input-glass" 
                style={{ padding: '0.75rem', flex: 1, borderRadius: '8px' }} 
                placeholder="Ketik balasan..." 
                value={input} onChange={e => setInput(e.target.value)} 
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 1rem', borderRadius: '8px' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
