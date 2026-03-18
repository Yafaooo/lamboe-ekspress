import React, { useState } from 'react';
import { Bot, Box, Sparkles, Send } from 'lucide-react';

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setChat(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let result = 'Kardus Ukuran Medium (M) + Bubble Wrap Tebal';
      if (currentInput.toLowerCase().includes('kulkas') || currentInput.toLowerCase().includes('tv')) {
        result = 'Packing Kayu Khusus + Asuransi Tambahan';
      } else if (currentInput.toLowerCase().includes('sepatu') || currentInput.toLowerCase().includes('baju')) {
        result = 'Polymailer Eco-Friendly atau Kardus Ukuran Small (S)';
      }

      setChat(prev => [...prev, { 
        role: 'ai', 
        text: `Berdasarkan analisis barang yang dikirim, kami merekomendasikan:\n\n**${result}**\n\nTips tambahan: Pastikan sudut-sudut barang yang tajam dilapisi karton ekstra. Anda bisa memilih layanan "Smart Guarantee" LAMBOE untuk proteksi maksimal.`
      }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container animate-fade-up" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="text-center mb-8">
        <div className="badge mb-4" style={{ background: 'rgba(255, 215, 0, 0.1)', color: 'var(--accent)', borderColor: 'var(--accent)' }}>
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Fitur Eksklusif
        </div>
        <h2>AI Packing Assistant</h2>
        <p style={{ color: 'var(--text-muted)' }}>Bingung pilih ukuran kardus? Biarkan AI kami yang menentukan proteksi paling efisien.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '1rem', minHeight: '300px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            {chat.length === 0 ? (
              <div className="flex-col items-center justify-center flex" style={{ height: '100%', color: 'var(--text-muted)', textAlign: 'center' }}>
                <Bot size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '1rem' }} />
                <p>Halo! Ceritakan barang apa yang ingin Anda kirim hari ini.<br/>(Contoh: "Saya mau kirim 5 pasang sepatu sneaker")</p>
              </div>
            ) : (
              chat.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'rgba(255, 51, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  padding: '1rem',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  border: m.role === 'user' ? '1px solid rgba(255, 51, 102, 0.4)' : '1px solid var(--glass-border)'
                }}>
                  {m.role === 'ai' && <Bot size={18} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />}
                  <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{m.text}</p>
                </div>
              ))
            )}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <span className="animate-pulse" style={{ color: 'var(--accent)' }}>AI is thinking...</span>
              </div>
            )}
          </div>

          <form onSubmit={handlePredict} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input 
              type="text" className="input-glass" 
              style={{ padding: '1rem', flex: 1 }} 
              placeholder="Contoh: 1 set PC Gaming dan 2 Monitor..." 
              value={input} onChange={e => setInput(e.target.value)} 
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0 1.5rem', borderRadius: '12px' }}>
              <Send size={20} />
            </button>
          </form>
        </div>

        <div className="flex-col gap-4">
          <div className="glass-panel text-center">
            <Box size={48} color="var(--success)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 className="mb-2">100% Eco-Friendly</h3>
            <p style={{ color: 'var(--text-muted)' }}>Semua rekomendasi material dari AI LAMBOE dirancang untuk meminimalisir limbah karbon (Zero-Emission Packaging).</p>
          </div>
          <div className="glass-panel text-center mt-6" style={{ background: 'rgba(255, 215, 0, 0.05)', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
             <h3 className="text-primary-gradient mb-2">Portfolio Showcase</h3>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fitur AI ini mensimulasikan penggunaan LLM sederhana untuk membantu pengguna logistik. Inovasi ini membedakan L.A.M.B.O.E Ekspress dari platform lain.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
