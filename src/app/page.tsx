'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Youtube, Highlighter, Mic2,
  Search, Bell, User, Play, Plus, Zap, ArrowRight
} from 'lucide-react'
import SmartNotepad from '../components/SmartNotepad'
import LibraryView from '../components/LibraryView'
import YouTubeLabView from '../components/YouTubeLabView'
import VoiceModeView from '../components/VoiceModeView'

/* ===== CC·AI LOGO SVG ===== */
function CCAILogo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none">
      <circle cx="32" cy="40" r="28" fill="#4D3FFF" />
      <circle cx="52" cy="32" r="20" fill="#F7F6F2" stroke="#4D3FFF" strokeWidth="1" />
      <circle cx="52" cy="32" r="14" fill="#F7F6F2" />
      <circle cx="52" cy="32" r="9" fill="#00C896" opacity="0.9" />
      <circle cx="32" cy="40" r="10" fill="#F7F6F2" />
      <circle cx="52" cy="32" r="4" fill="#F7F6F2" />
    </svg>
  )
}

/* ===== Gurukul-inspired icon components ===== */
function GurukulIcon({ type, size = 20 }: { type: string, size?: number }) {
  const s = size
  switch (type) {
    case 'vidya': // Knowledge/Dashboard — Lamp of learning
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0" />
          <path d="M8 14s1.5-2 4-2 4 2 4 2" />
          <path d="M12 3v1" />
          <path d="M12 8a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
          <path d="M10 16v4h4v-4" />
          <path d="M10 12h4" />
          <path d="M9 20h6" />
        </svg>
      )
    case 'granth': // Library — Sacred scroll
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.5" />
          <path d="M12 12v3" />
        </svg>
      )
    case 'drishya': // YouTube — All-seeing eye
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )
    case 'lekhani': // Notes — Quill/pen
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          <path d="M15 5l4 4" />
        </svg>
      )
    case 'vani': // Voice — Om/sound waves
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <path d="M12 19v4" />
          <path d="M8 23h8" />
        </svg>
      )
    default:
      return null
  }
}

/* ===== COUNTER HOOK ===== */
function useCounter(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    const timer = setTimeout(() => requestAnimationFrame(step), 400)
    return () => clearTimeout(timer)
  }, [end, duration])
  return count
}

/* ===== TYPING HOOK ===== */
function useTypingEffect(text: string, speed: number = 40) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++ }
      else clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

/* ===== MAIN ===== */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardView />
      case 'Library': return <LibraryView />
      case 'YouTube Lab': return <YouTubeLabView />
      case 'Notes Engine': return <div style={{ padding: '56px' }}><SmartNotepad /></div>
      case 'Voice Mode': return <VoiceModeView />
      default: return <DashboardView />
    }
  }

  if (!isMounted) return null

  return (
    <div className="layout-container">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ padding: '0 10px', marginBottom: '8px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <CCAILogo size={42} />
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '16px', letterSpacing: '-0.02em' }}>
                CC<span style={{ color: 'var(--violet)' }}>·AI</span>
              </div>
              <div className="label" style={{ color: 'var(--mist)', fontSize: '9px', marginTop: '2px', fontFamily: '"Noto Sans Devanagari", sans-serif' }}>गुरुकुल ४</div>
            </div>
          </div>
        </motion.div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
            { icon: <BookOpen size={16} />, label: 'Library' },
            { icon: <Youtube size={16} />, label: 'YouTube Lab' },
            { icon: <Highlighter size={16} />, label: 'Notes Engine' },
            { icon: <Mic2 size={16} />, label: 'Voice Mode' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className={`nav-item ${activeTab === item.label ? 'active' : ''}`}
              onClick={() => setActiveTab(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'var(--pearl)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="label" style={{ color: 'var(--violet)' }}>Daily Credits</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>3/20</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '6px', marginBottom: '12px' }}>
              <div className="progress-bar-fill shimmer-fill" style={{ width: '15%', background: 'var(--jade)' }}></div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--mist)', lineHeight: 1.4 }}>
              Unlock limitless intelligence and cross-disciplinary learning.
            </p>
          </div>
          <motion.button
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-coral"
            style={{ width: '100%', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em' }}
          >
            UPGRADE TO PRO
          </motion.button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="content-wrapper">
        <div className="bg-mesh" />
        <header className="top-bar">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px', letterSpacing: '-0.02em' }}>
              College Circle <span style={{ color: 'var(--violet)' }}>AI</span>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            style={{ flex: 1, maxWidth: '420px', position: 'relative', margin: '0 48px' }}>
            <Search size={16} color="var(--mist)" style={{ position: 'absolute', left: '16px', top: '12px', zIndex: 1 }} />
            <input className="search-input" type="text" placeholder="Search concepts, lectures, or labs..." />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.div whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }} style={{ cursor: 'pointer' }}>
              <Bell size={18} color="var(--mist)" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} style={{ width: '36px', height: '36px', background: 'var(--violet)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <User size={18} color="white" />
            </motion.div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(3px)' }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ===== DASHBOARD VIEW ===== */
function DashboardView() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } }
  const greeting = useTypingEffect('Good morning, Scholar.', 50)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="main-view">
      <div className="main-content-area">

        {/* Hero */}
        <motion.div variants={item} style={{ marginBottom: '72px' }}>
          <div className="label" style={{ color: 'var(--violet)', marginBottom: '16px' }}><span style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>विद्या प्रवाह</span> · ACADEMIC OVERVIEW</div>
          <h1 className="serif" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '20px', lineHeight: 1.05 }}>
            {greeting}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ borderRight: '2px solid var(--violet)', marginLeft: '2px' }}>&nbsp;</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            style={{ color: 'var(--mist)', fontSize: '15px', lineHeight: 1.8, maxWidth: '520px' }}>
            Your indexing for <strong style={{ color: 'var(--ink)' }}>Quantum Mechanics II</strong> is 84% complete. The semantic structure is ready for exploration.
          </motion.p>
        </motion.div>

        {/* Active Streams */}
        <motion.section variants={item} style={{ marginBottom: '72px' }}>
          <div className="section-header">
            <h3>Active Streams</h3>
            <motion.a whileHover={{ x: 3 }} href="#" className="view-all">View All → </motion.a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <StreamCard title="Quantum Physics II" subtitle="Advanced Wave Mechanics & Particle Duality" progress={84} color="var(--violet)" delay={0} />
            <StreamCard title="Neural Networks" subtitle="Backpropagation Foundations & Optimization" progress={42} status="PAUSED" color="var(--ink)" delay={0.12} />
          </div>
        </motion.section>

        {/* Subject Structure */}
        <motion.section variants={item}>
          <div className="section-header"><h3>Subject Structure</h3></div>
          <div className="card" style={{ padding: '40px' }}>
            <div style={{ color: 'var(--mist)', fontSize: '13px', marginBottom: '48px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Semantic map of current knowledge hierarchy</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '0 32px' }}>
              <motion.div style={{ position: 'absolute', top: '16px', left: '56px', right: '56px', height: '1px', background: 'var(--border)' }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} />
              <StructureNode label="Classical Era" status="Mastered" active={false} index={1} />
              <StructureNode label="Special Relativity" status="Mastered" active={false} index={2} />
              <StructureNode label="Quantum State" status="Active" active={true} index={3} />
              <StructureNode label="Quantum Field" status="Locked" active={false} index={4} />
            </div>
          </div>
        </motion.section>
      </div>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <motion.section variants={item} style={{ marginBottom: '48px' }}>
          <div className="section-header"><h3>Knowledge Labs</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <LabCard title="YouTube Lab" desc="Transform academic lectures into structured notes instantly." icon={<Youtube size={20} />} color="var(--coral)" bgColor="rgba(255,77,90,0.08)" />
            <LabCard title="Knowledge Lab" desc="Query your cross-disciplinary knowledge base with AI." icon={<Mic2 size={20} />} color="var(--violet)" bgColor="var(--violet-pale)" />
          </div>
        </motion.section>

        <motion.div variants={item} className="card" style={{ background: 'var(--cream)', border: 'none', padding: '24px' }}>
          <div className="label" style={{ color: 'var(--violet)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}>
              <Zap size={12} fill="var(--violet)" />
            </motion.div>
            AI Citation Daily
          </div>
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-display)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '24px' }}>
            "Education is a right. Not a privilege."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CCAILogo size={32} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>CC·AI Philosophy</div>
              <div style={{ fontSize: '11px', color: 'var(--mist)', fontFamily: 'var(--font-mono)' }}>Built by students, for students</div>
            </div>
          </div>
        </motion.div>
      </aside>
    </motion.div>
  )
}

/* ===== STREAM CARD ===== */
function StreamCard({ title, subtitle, progress, status, color, delay }: { title: string, subtitle: string, progress: number, status?: string, color: string, delay: number }) {
  const isPaused = status === 'PAUSED'
  const animatedProgress = useCounter(progress, 1200)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={{ translate: '-2px -2px', boxShadow: `7px 7px 0px ${color === 'var(--violet)' ? '#4D3FFF' : '#09090F'}` }}
      whileTap={{ translate: '2px 2px', boxShadow: `1px 1px 0px ${color === 'var(--violet)' ? '#4D3FFF' : '#09090F'}` }}
      className="studojo-card"
      style={{ borderColor: color === 'var(--violet)' ? '#4D3FFF' : '#09090F', boxShadow: `5px 5px 0px ${color === 'var(--violet)' ? '#4D3FFF' : '#09090F'}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ width: '40px', height: '40px', background: color === 'var(--violet)' ? '#4D3FFF' : '#09090F', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={16} fill="white" color="white" />
        </div>
        {isPaused ? <div className="paused-badge">PAUSED</div> : <div className="live-badge"><span className="live-dot" /> LIVE INDEXING</div>}
      </div>
      <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{title}</h4>
      <p style={{ fontSize: '13px', color: 'var(--mist)', marginBottom: '24px', lineHeight: 1.5 }}>{subtitle}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--mist)' }}>
        <span>Indexing Progress</span>
        <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{animatedProgress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className={`progress-bar-fill ${!isPaused ? 'shimmer-fill' : ''}`} style={{ width: `${progress}%`, background: isPaused ? 'var(--mist)' : undefined }}></div>
      </div>
    </motion.div>
  )
}

/* ===== STRUCTURE NODE ===== */
function StructureNode({ label, status, active, index }: { label: string, status: string, active: boolean, index: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1, width: '110px', textAlign: 'center' }}
    >
      <div className={active ? 'node-active' : ''} style={{
        width: active ? '28px' : '18px', height: active ? '28px' : '18px',
        background: active ? 'var(--violet)' : status === 'Locked' ? 'var(--cream)' : 'var(--deep)',
        borderRadius: '50%', border: active ? '4px solid var(--violet-pale)' : '2px solid white',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        boxShadow: active ? '0 0 20px rgba(77,63,255,0.15)' : '0 2px 6px rgba(9,9,15,0.08)'
      }}>
        {active && <div style={{ width: '4px', height: '4px', background: 'white', borderRadius: '50%' }} />}
      </div>
      <div style={{ fontSize: '13px', fontWeight: 600 }}>{label}</div>
      <div className="mono" style={{ fontSize: '10px', color: active ? 'var(--violet)' : 'var(--mist)', letterSpacing: '0.05em' }}>{status}</div>
    </motion.div>
  )
}

/* ===== LAB CARD ===== */
function LabCard({ title, desc, icon, color, bgColor }: { title: string, desc: string, icon: any, color: string, bgColor: string }) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="card tactile-card" style={{ cursor: 'pointer', padding: '24px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, background: bgColor, marginBottom: '16px' }}>
        {icon}
      </div>
      <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{title}</h4>
      <p style={{ fontSize: '13px', color: 'var(--mist)', lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  )
}
