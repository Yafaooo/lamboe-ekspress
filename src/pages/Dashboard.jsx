import React, { useState, useEffect } from 'react';
import { getShipments, getWalletBalance } from '../utils/localStorage';
import { Package, Video, FileText, ArrowRight, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [videoModal, setVideoModal] = useState(null);

  useEffect(() => {
    setShipments(getShipments().reverse()); // Newest first
    setWallet(getWalletBalance());
  }, []);

  return (
    <div className="container animate-fade-up" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Header section with wallet */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="glass-panel" style={{ gridColumn: 'span 2' }}>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Halo, User!</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Kelola riwayat pengiriman dan pantau garansi Smart Contract-mu.</p>
        </div>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="flex items-center gap-2 mb-2">
            <Wallet color="var(--accent)" />
            <h4 style={{ margin: 0, color: 'var(--text-muted)' }}>Saldo Cashback Telat</h4>
          </div>
          <h2 className="text-primary-gradient" style={{ margin: 0 }}>Rp {wallet.toLocaleString('id-ID')}</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem' }}>Otomatis bertambah jika pengiriman telat</p>
        </div>
      </div>

      <div className="glass-panel w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 style={{ margin: 0 }}>Riwayat Pengiriman</h3>
          <Link to="/pickup" className="btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ Buat Kiriman</Link>
        </div>

        {shipments.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <Package size={48} color="var(--glass-border)" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>Belum ada riwayat pengiriman.</p>
          </div>
        ) : (
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>No. Resi</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Rute</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Aksi / Bukti</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{s.id}</td>
                    <td style={{ padding: '1rem' }}>
                      {s.senderCity} <ArrowRight size={14} style={{ display: 'inline', color: 'var(--text-muted)' }}/> {s.receiverCity}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ 
                        background: s.status === 'DELIVERED' ? 'rgba(0,230,118,0.1)' : 'rgba(255,51,102,0.1)',
                        color: s.status === 'DELIVERED' ? 'var(--success)' : 'var(--primary)',
                        border: 'none'
                      }}>
                        {s.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div className="flex gap-2">
                        <Link to={`/tracking?resi=${s.id}`} className="btn-glass" style={{ padding: '0.4rem', borderRadius: '6px' }} title="Lacak">
                          <Package size={16} />
                        </Link>
                        {s.videoProof && (
                          <button onClick={() => setVideoModal(s.id)} className="btn-primary" style={{ padding: '0.4rem', borderRadius: '6px' }} title="Video Proof">
                            <Video size={16} />
                          </button>
                        )}
                        {s.status === 'DELIVERED' && (
                          <button onClick={() => alert('Download Mock Invoice: ' + s.id)} className="btn-glass" style={{ padding: '0.4rem', borderRadius: '6px' }} title="Invoice">
                            <FileText size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Video Proof Modal */}
      {videoModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setVideoModal(null)}>
          <div className="glass-panel animate-fade-up" style={{ width: '100%', maxWidth: '500px', padding: '1.5rem', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <h3 className="mb-4 text-center">Video Proof Delivery</h3>
            <div style={{ width: '100%', height: '300px', background: '#000', borderRadius: '12px', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Video color="rgba(255,255,255,0.2)" size={64} style={{ position: 'absolute' }}/>
               <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '8px' }}>
                 <span>Simulated Video Format</span>
               </div>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Merekam detik-detik paket diletakkan di alamat tujuan. Kredibilitas 100%.</p>
            <button className="btn-primary w-full mt-4" onClick={() => setVideoModal(null)}>Tutup Video</button>
          </div>
        </div>
      )}
    </div>
  );
}
