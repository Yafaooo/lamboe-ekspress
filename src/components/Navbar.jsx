import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', color: 'white' }}>
          <Package size={32} color="var(--primary)" />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            LAMBOE<span className="text-primary-gradient">.X</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="flex items-center gap-6" style={{ display: 'flex', '@media (max-width: 768px)': { display: 'none' } }}>
          <Link to="/tracking" style={{ textDecoration: 'none', color: 'white', fontWeight: 500, transition: 'color 0.2s' }}>Lacak Resi</Link>
          <Link to="/ai-assistant" className="text-primary-gradient" style={{ textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.2s' }} onMouseOver={(e)=> e.target.style.opacity='0.8'} onMouseOut={(e)=> e.target.style.opacity='1'}>AI Assistant</Link>
          <Link to="/pickup" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e)=> e.target.style.color='white'} onMouseOut={(e)=> e.target.style.color='var(--text-muted)'}>Order Pickup</Link>
          <Link to="/dashboard" className="btn btn-primary animate-pulse-glow" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', marginLeft: '1rem' }}>
            Dashboard
          </Link>
        </div>

        {/* Mobile menu logic could be added here later */}
      </div>
    </nav>
  );
}
