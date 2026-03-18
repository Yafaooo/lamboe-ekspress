import React from 'react';
import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--secondary)', borderTop: '1px solid var(--glass-border)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div className="grid grid-cols-2 gap-8 mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem' }}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package size={24} color="var(--primary)" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                LAMBOE<span className="text-primary-gradient">.Express</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
              Logistik Aman, Mudah, Biaya Ongkir Efisien.
              The most advanced, modern logistics platform powered by smart simulations.
            </p>
          </div>
          <div className="flex gap-8 justify-between">
            <div className="flex-col gap-2">
              <h4 style={{ marginBottom: '1rem' }}>Layanan</h4>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Pengiriman Cepat</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Cek Ongkir</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Lacak Paket</a>
            </div>
            <div className="flex-col gap-2">
              <h4 style={{ marginBottom: '1rem' }}>Fitur Unggul</h4>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Eco-Route Tracking</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>AI Packing Assistant</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>Cashback Telat</a>
            </div>
          </div>
        </div>
        <div className="text-center" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} LAMBOE Ekspress.
        </div>
      </div>
    </footer>
  );
}
