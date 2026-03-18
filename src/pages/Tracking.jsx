import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getShipmentByResi, updateShipmentStatus } from '../utils/localStorage';
import { MapPin, Search, Navigation, PackageCheck, AlertCircle } from 'lucide-react';
import LiveChat from '../components/LiveChat';

export default function Tracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputResi, setInputResi] = useState(searchParams.get('resi') || '');
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!inputResi) return;
    setSearchParams({ resi: inputResi });
    setLoading(true);

    setTimeout(() => {
      const data = getShipmentByResi(inputResi);
      setShipment(data || 'NOT_FOUND');
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    document.title = 'Lacak Resi | LAMBOE Ekspress';
    if (searchParams.get('resi')) {
      handleSearch();
    }
  }, [searchParams]);

  const simulateUpdateStatus = () => {
    if (!shipment || typeof shipment === 'string') return;
    if (shipment.status === 'DELIVERED') return;
    
    let nextStatus = 'IN_TRANSIT';
    let location = 'Hub ' + shipment.senderCity;
    if (shipment.status === 'IN_TRANSIT') {
      nextStatus = 'DELIVERED';
      location = shipment.receiverCity;
    }

    updateShipmentStatus(shipment.id, nextStatus, location);
    // Refresh Data
    setShipment(getShipmentByResi(shipment.id));
  };

  return (
    <div className="container animate-fade-up" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div className="text-center mb-8">
        <div className="badge mb-4">Tracking Real-Time</div>
        <h2>Lacak Perjalanan Paket Anda</h2>
        
        <form onSubmit={handleSearch} className="flex justify-center mt-6" style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
            <Search size={20} style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--text-muted)' }} />
            <input 
              type="text" className="input-glass" 
              style={{ paddingLeft: '3rem', borderRadius: '12px 0 0 12px' }} 
              placeholder="Masukkan Nomor Resi..." 
              value={inputResi} onChange={(e) => setInputResi(e.target.value)} 
            />
            <button type="submit" className="btn-primary" style={{ borderRadius: '0 12px 12px 0', padding: '0 2rem' }}>
              {loading ? 'Mencari...' : 'Lacak'}
            </button>
          </div>
        </form>
      </div>

      {loading && <div className="text-center mt-8"><div className="badge">Loading...</div></div>}

      {!loading && shipment === 'NOT_FOUND' && (
        <div className="text-center mt-8">
          <AlertCircle size={48} color="var(--primary)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
          <h3>Resi Tidak Ditemukan</h3>
          <p style={{ color: 'var(--text-muted)' }}>Pastikan nomor resi (LB...) sudah benar.</p>
        </div>
      )}

      {!loading && shipment && shipment !== 'NOT_FOUND' && (
        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Timeline & Details */}
          <div className="glass-panel w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 style={{ margin: 0 }}>Detail Pengiriman</h3>
              <div className="badge" style={{ 
                background: shipment.status === 'DELIVERED' ? 'rgba(0,230,118,0.1)' : 'rgba(255,51,102,0.1)',
                color: shipment.status === 'DELIVERED' ? 'var(--success)' : 'var(--primary)',
                border: `1px solid ${shipment.status === 'DELIVERED' ? 'var(--success)' : 'var(--primary)'}`
              }}>
                {shipment.status.replace('_', ' ')}
              </div>
            </div>

            <div className="flex gap-4 mb-8" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>Pengirim</p>
                <h4 style={{ margin: 0 }}>{shipment.senderCity}</h4>
              </div>
              <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>Penerima</p>
                <h4 style={{ margin: 0 }}>{shipment.receiverCity}</h4>
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px dashed var(--glass-border)' }}>
              {shipment.history.map((h, i) => (
                <div key={i} style={{ marginBottom: '2rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-1.85rem', top: '0', width: '20px', height: '20px', background: 'var(--secondary)', border: `2px solid ${i === shipment.history.length-1 ? 'var(--primary)' : 'var(--success)'}`, borderRadius: '50%' }}></div>
                  <h5 style={{ margin: 0 }}>{h.status.replace('_', ' ')}</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>{new Date(h.time).toLocaleString('id-ID')} | Posisi: {h.location || '-'}</p>
                </div>
              ))}
            </div>

            {shipment.status !== 'DELIVERED' && (
              <button onClick={simulateUpdateStatus} className="btn-glass w-full mt-4" style={{ fontSize: '0.875rem' }}>
                [Mocking] Simulate Update Status
              </button>
            )}
          </div>

          {/* Map Mock & ETA */}
          <div>
            <div className="glass-panel mb-6" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url(https://i.ibb.co/3vkC8Y7/dark-map-mockup.png) center/cover', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }}></div>
              
              {/* Fake route line */}
              <div style={{ position: 'absolute', width: '60%', height: '2px', background: 'var(--glass-border)', zIndex: 1, top: '50%', left: '20%' }}></div>
              
              {/* Origin */}
              <div className="flex-col items-center gap-1" style={{ position: 'absolute', left: '15%', top: '45%', zIndex: 2 }}>
                <MapPin color="var(--success)" size={24} />
              </div>
              
              {/* Moving truck */}
              <div className="animate-pulse-glow" style={{ position: 'absolute', left: shipment.status === 'DELIVERED' ? '80%' : shipment.status === 'IN_TRANSIT' ? '50%' : '20%', top: '45%', zIndex: 3, transition: 'all 2s ease' }}>
                <Navigation color="var(--primary)" size={24} style={{ transform: 'rotate(90deg)' }} />
              </div>

               {/* Destination */}
               <div className="flex-col items-center gap-1" style={{ position: 'absolute', right: '15%', top: '45%', zIndex: 2 }}>
                <PackageCheck color="var(--accent)" size={24} />
              </div>
              
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 4, background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>● Live GPS Active</span>
              </div>
            </div>

            <div className="glass-panel">
              <h4 style={{ margin: '0 0 1rem 0' }}>Informasi Tambahan</h4>
              <div className="flex justify-between items-center" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimasi Tiba (ETA)</span>
                <strong>{new Date(shipment.eta).toLocaleTimeString('id-ID')}</strong>
              </div>
               <div className="flex justify-between items-center" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Layanan</span>
                <span style={{ color: shipment.smartContractActive ? 'var(--success)' : 'white' }}>
                  {shipment.type === 'smart' ? 'Smart Guarantee' : 'Reguler'}
                </span>
              </div>
              <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Kurir Tono</span>
                <span style={{background: 'rgba(255,215,0,0.1)', color: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem'}}>Premium Service</span>
              </div>
              
            </div>

            {/* Render Chat component specifically for this layout */}
            {shipment.status !== 'DELIVERED' && <LiveChat />}
          </div>
        </div>
      )}
    </div>
  );
}
