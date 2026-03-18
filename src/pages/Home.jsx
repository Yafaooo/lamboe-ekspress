import React from 'react';
import { Truck, ShieldCheck, Zap, ArrowRight, Video, Fingerprint, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="container grid grid-cols-2 gap-8 items-center">
          <div>
            <div className="badge mb-4 animate-float" style={{ animationDelay: '0s' }}>🚀 Inovasi Pengiriman 2026</div>
            <h1 className="mb-4">
              Pengiriman <span className="text-primary-gradient">Masa Depan</span>, Kini Hadir di Genggaman.
            </h1>
            <p className="mb-8" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
               LAMBOE Ekspress menjamin keamanan paket dengan Video Proof, Blockchain Guarantee, dan Carbon-offset Eco-Route pertama di Indonesia.
            </p>
            <div className="flex gap-4">
              <Link to="/tracking" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Lacak Resi <ArrowRight size={20} />
              </Link>
              <Link to="/pickup" className="btn btn-glass" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Order Pickup
              </Link>
            </div>
            
            {/* Trust Metrics */}
            <div className="flex gap-8 mt-12" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <div>
                <h3 style={{ color: 'var(--text-main)', margin: 0 }}>99.9%</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Tepat Waktu (<span style={{color: 'var(--accent)'}}>SLA Guarantee</span>)</p>
              </div>
              <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
              <div>
                <h3 style={{ color: 'var(--text-main)', margin: 0 }}>100%</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Carbon Offset</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center position-relative">
            {/* Floating UI Elements mimicking an advanced app */}
            <div className="glass-panel animate-float" style={{ animationDelay: '2s', width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 style={{ margin: 0 }}>Lacak Paket Anda</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Real-time GPS Tracking</p>
                </div>
                <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 10px var(--success)' }} className="animate-pulse"></div>
              </div>
              
              <div className="mb-4">
                <input type="text" className="input-glass" placeholder="Masukkan Nomor Resi (LB...)" />
              </div>
              <button className="btn btn-primary w-full shadow-lg">Lacak Sekarang</button>

              <div className="mt-6 flex items-center justify-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3">
                  <div style={{ background: 'rgba(255,215,0,0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                    <Banknote size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Smart Contract Guarantee</h5>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-Refund jika telat 1 menit</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual background blob */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '300px', height: '300px',
              background: 'radial-gradient(circle, rgba(255,51,102,0.4) 0%, rgba(255,215,0,0) 70%)',
              filter: 'blur(40px)', zIndex: 0
            }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-2">Fitur Unggulan Kami</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Bukan sekadar ekspedisi biasa. Kami membawa teknologi tercanggih ke logistik Anda.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Video size={32} color="var(--primary)" />}
              title="Video Proof Delivery"
              desc="Setiap paket yang dikirimkan memiliki bukti video singkat untuk memastikan paket diterima dengan aman."
            />
            <FeatureCard 
              icon={<Zap size={32} color="var(--accent)" />}
              title="Cashback Telat"
              desc="Janji adalah janji. Jika kurir kami terlambat 1 jam saja, saldo otomatis masuk ke dompet digital Anda."
            />
             <FeatureCard 
              icon={<Fingerprint size={32} color="var(--success)" />}
              title="AI Packing Assistant"
              desc="Bingung ukuran kardus? Ketik barang yang akan Anda kirim, AI kami akan menentukan kardus paling efisien."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel text-center" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="mb-6 flex justify-center" style={{ 
        width: '64px', height: '64px', margin: '0 auto', 
        background: 'rgba(255,255,255,0.05)', borderRadius: '16px', 
        alignItems: 'center', display: 'flex' 
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{desc}</p>
    </div>
  );
}
