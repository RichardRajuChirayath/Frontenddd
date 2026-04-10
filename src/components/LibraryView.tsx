'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, CheckCircle2, MapPin, Layers, ScanLine, ArrowRight
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const UPLOADED_MATERIALS = [
  { name: 'Quantum_Mechanics_Griffiths_Ch4.pdf', type: 'PDF', size: '12.4 MB', status: 'Indexed', icon: '📄' },
  { name: 'Lecture_Slides_Week6.pptx', type: 'Slides', size: '8.2 MB', status: 'Indexed', icon: '📊' },
  { name: 'Scanned_Handwritten_Notes.pdf', type: 'Scanned', size: '3.1 MB', status: 'Processing', icon: '📝' },
  { name: 'Lab_Report_Particle_Duality.docx', type: 'Document', size: '1.4 MB', status: 'Indexed', icon: '🔬' },
  { name: 'Formula_Sheet_Midterm.pdf', type: 'PDF', size: '640 KB', status: 'Indexed', icon: '📐' },
]

const MAPPED_STRUCTURE = [
  { topic: 'Wave Functions & Probability', refs: 3, status: 'complete' },
  { topic: 'The Schrödinger Equation', refs: 5, status: 'complete' },
  { topic: 'Quantum Tunneling', refs: 2, status: 'active' },
  { topic: 'Angular Momentum & Spin', refs: 0, status: 'pending' },
  { topic: 'Perturbation Theory', refs: 0, status: 'pending' },
]

export default function LibraryView() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ padding: '56px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <motion.div variants={item} style={{ marginBottom: '56px' }}>
        <div className="label" style={{ color: 'var(--violet)', marginBottom: '16px' }}><span style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>ग्रंथालय</span> · COURSE INTELLIGENCE</div>
        <h1 className="serif" style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Your Library
        </h1>
        <p style={{ color: 'var(--mist)', fontSize: '15px', lineHeight: 1.8, maxWidth: '560px' }}>
          Upload your syllabus and study materials. AI indexes everything so all generations pull from <strong style={{ color: 'var(--ink)' }}>your own content first</strong>.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '56px' }}>
        {/* Course Plan */}
        <motion.div variants={item}>
          <motion.div whileHover={{ translate: '-2px -2px', boxShadow: '7px 7px 0px #4D3FFF' }}
            className="studojo-card" style={{ borderColor: '#4D3FFF', boxShadow: '5px 5px 0px #4D3FFF', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', background: 'var(--violet-pale)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={20} color="var(--violet)" />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>Course Plan Upload</h3>
                <div className="live-badge" style={{ display: 'inline-flex' }}><span className="live-dot" /> AUTO-MAPPING</div>
              </div>
            </div>
            <motion.div whileHover={{ borderColor: 'var(--violet)' }}
              style={{ border: '2px dashed var(--border)', borderRadius: '16px', padding: '32px', textAlign: 'center', cursor: 'pointer', background: 'var(--pearl)', marginBottom: '20px', transition: 'all 0.2s ease' }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Upload size={24} color="var(--violet)" strokeWidth={1.5} />
              </motion.div>
              <p style={{ fontWeight: 600, fontSize: '13px', marginTop: '12px', marginBottom: '4px' }}>Upload Syllabus or Course Plan</p>
              <p style={{ color: 'var(--mist)', fontSize: '11px' }}>PDF, DOCX — We'll map the entire structure</p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Maps entire subject structure automatically', 'Identifies & sources references inside plan', 'Syncs with YouTube Lab for topic matching'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                  style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--mist)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={14} color="var(--jade)" style={{ flexShrink: 0, marginTop: '3px' }} />{f}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Study Materials */}
        <motion.div variants={item}>
          <motion.div whileHover={{ translate: '-2px -2px', boxShadow: '7px 7px 0px #09090F' }}
            className="studojo-card" style={{ borderColor: '#09090F', boxShadow: '5px 5px 0px #09090F', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(9,9,15,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={20} color="var(--ink)" />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>Study Material Upload</h3>
                <div className="paused-badge" style={{ display: 'inline-block' }}>AI INDEXING</div>
              </div>
            </div>
            <motion.div whileHover={{ borderColor: 'var(--ink)' }}
              style={{ border: '2px dashed var(--border)', borderRadius: '16px', padding: '32px', textAlign: 'center', cursor: 'pointer', background: 'var(--pearl)', marginBottom: '20px', transition: 'all 0.2s ease' }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <ScanLine size={24} color="var(--ink)" strokeWidth={1.5} />
              </motion.div>
              <p style={{ fontWeight: 600, fontSize: '13px', marginTop: '12px', marginBottom: '4px' }}>Upload PDFs, Slides, Scanned Notes</p>
              <p style={{ color: 'var(--mist)', fontSize: '11px' }}>AI reads and indexes all material</p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['PDFs, slides, scanned handwritten notes', 'AI reads and indexes everything automatically', 'Notes, flashcards, MCQs use your refs first'].map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                  style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--mist)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={14} color="var(--jade)" style={{ flexShrink: 0, marginTop: '3px' }} />{f}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subject Structure */}
      <motion.section variants={item} style={{ marginBottom: '56px' }}>
        <div className="section-header">
          <h3>Mapped Subject Structure</h3>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--mist)' }}>From: Quantum Mechanics II Syllabus</span>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {MAPPED_STRUCTURE.map((topic, i) => (
            <motion.div key={topic.topic}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06, type: 'spring' }}
              whileHover={{ background: 'var(--pearl)' }}
              style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: i < MAPPED_STRUCTURE.length - 1 ? '1px solid var(--border-light)' : 'none', cursor: 'pointer', transition: 'background 0.15s ease' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                background: topic.status === 'complete' ? 'var(--jade)' : topic.status === 'active' ? 'var(--violet)' : 'var(--cream)',
                boxShadow: topic.status === 'active' ? '0 0 10px rgba(77,63,255,0.2)' : 'none' }} />
              <div style={{ flex: 1 }}><span style={{ fontWeight: 600, fontSize: '14px' }}>{topic.topic}</span></div>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--mist)' }}>
                {topic.refs > 0 ? `${topic.refs} refs` : 'No refs'}
              </span>
              <ArrowRight size={12} color="var(--mist)" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Uploaded */}
      <motion.section variants={item}>
        <div className="section-header">
          <h3>Uploaded Materials</h3>
          <span className="mono" style={{ color: 'var(--jade)', fontSize: '11px' }}>
            {UPLOADED_MATERIALS.filter(m => m.status === 'Indexed').length}/{UPLOADED_MATERIALS.length} INDEXED
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {UPLOADED_MATERIALS.map((doc, i) => (
            <motion.div key={doc.name}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05, type: 'spring' }}
              whileHover={{ x: 3 }} className="card tactile-card"
              style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.2rem' }}>{doc.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--mist)' }}>{doc.type} · {doc.size}</div>
              </div>
              <div className="mono" style={{
                fontSize: '10px', fontWeight: 500, padding: '4px 10px', borderRadius: '2px',
                background: doc.status === 'Indexed' ? 'rgba(0,200,150,0.08)' : 'rgba(245,166,35,0.08)',
                color: doc.status === 'Indexed' ? 'var(--jade)' : 'var(--amber)'
              }}>
                {doc.status === 'Indexed' ? '✓ Indexed' : '⟳ Processing'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
