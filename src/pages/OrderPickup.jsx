import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, MapPin, Calculator, ShieldCheck } from 'lucide-react';
import { createShipment } from '../utils/localStorage';

export default function OrderPickup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senderCity: '',
    receiverCity: '',
    weight: 1,
    type: 'regular' // regular or smart
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Mock Cek Ongkir Otomatis Calculation
    if (form.senderCity && form.receiverCity && form.weight) {
      // Basic mock formula
      const baseFee = 10000;
      const weightFee = form.weight * 5000;
      const smartFee = form.type === 'smart' ? 15000 : 0;
      setPrice(baseFee + weightFee + smartFee);
    } else {
      setPrice(0);
    }
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price === 0) return;
    
    const shipment = createShipment({
      ...form,
      price
    });
    
    // Redirect to Tracking with new resi
    navigate(`/tracking?resi=${shipment.id}`);
  };

  return (
    <div className="animate-fade-up container" style={{ padding: '4rem 1.5rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="grid grid-cols-2 gap-8 w-full">
        
        {/* Left Info Text */}
        <div style={{ paddingTop: '2rem' }}>
          <div className="badge mb-4">Pickup H+0</div>
          <h2 className="mb-4">Kirim Tanpa Repot, <br/><span className="text-primary-gradient">Kami Yang Jemput.</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Biaya ongkir otomatis dihitung secara real-time. Aktifkan **Smart Contract Guarantee** untuk jaminan cashback 50% jika terlambat lebih dari janji estimasi (ETA).
          </p>
          
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Calculator color="var(--primary)" size={32} />
            <div>
              <h4 style={{ margin: 0 }}>Cek Ongkir Otomatis</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Ketik kota asal & tujuan langsung keluar harga</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ShieldCheck color="var(--success)" size={32} />
            <div>
              <h4 style={{ margin: 0 }}>Smart Contract Protection</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Proteksi keterlambatan berbasis blockchain simulasi</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="glass-panel w-full" style={{ padding: '2.5rem' }}>
          <h3 className="mb-6">Order Pickup Now</h3>
          <form onSubmit={handleSubmit} className="flex-col gap-4 grid">
            
            <div className="flex gap-4">
              <div className="w-full">
                <label className="mb-2" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Kota Pengirim</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--text-muted)' }} />
                  <input required
                    type="text" className="input-glass" style={{ paddingLeft: '2.5rem' }} 
                    placeholder="Misal: Jakarta" 
                    value={form.senderCity} onChange={e => setForm({...form, senderCity: e.target.value})} 
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-2" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Kota Penerima</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--text-muted)' }} />
                  <input required
                    type="text" className="input-glass" style={{ paddingLeft: '2.5rem' }} 
                    placeholder="Misal: Bandung" 
                    value={form.receiverCity} onChange={e => setForm({...form, receiverCity: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Berat Paket (Kg)</label>
              <div style={{ position: 'relative' }}>
                <PackageOpen size={18} style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--text-muted)' }} />
                <input required
                  type="number" min="1" className="input-glass" style={{ paddingLeft: '2.5rem' }} 
                  value={form.weight} onChange={e => setForm({...form, weight: parseInt(e.target.value) || 0})} 
                />
              </div>
            </div>

            <div>
              <label className="mb-2" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tipe Layanan</label>
              <div className="flex gap-4">
                <label style={{ flex: 1, cursor: 'pointer', padding: '1rem', border: `1px solid ${form.type === 'regular' ? 'var(--primary)' : 'var(--glass-border)'}`, borderRadius: '12px', background: form.type === 'regular' ? 'rgba(255,51,102,0.1)' : 'transparent', transition: 'all 0.2s' }}>
                  <input type="radio" value="regular" checked={form.type === 'regular'} onChange={e => setForm({...form, type: e.target.value})} style={{ display: 'none' }} />
                  <strong>Reguler</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Est. 2 Hari</p>
                </label>
                <label style={{ flex: 1, cursor: 'pointer', padding: '1rem', border: `1px solid ${form.type === 'smart' ? 'var(--success)' : 'var(--glass-border)'}`, borderRadius: '12px', background: form.type === 'smart' ? 'rgba(0,230,118,0.1)' : 'transparent', transition: 'all 0.2s' }}>
                  <input type="radio" value="smart" checked={form.type === 'smart'} onChange={e => setForm({...form, type: e.target.value})} style={{ display: 'none' }} />
                  <strong style={{ color: 'var(--success)' }}>Smart Guarantee</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cashback jika telat</p>
                </label>
              </div>
            </div>

            <div className="mt-4 p-4 text-center" style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Estimasi Ongkir</p>
              <h2 className="text-primary-gradient">Rp {price.toLocaleString('id-ID')}</h2>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4" disabled={price === 0}>
              Pesan Kurir (Simulasi)
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
