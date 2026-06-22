import React from 'react'

export default function CustomLogo() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
      fontWeight: 'bold', 
      fontSize: '16px',
      color: 'white' 
    }}>
      {/* Neutral generic shape */}
      <div style={{ width: '20px', height: '20px', background: '#444', borderRadius: '4px' }} />
      <span>CMS Admin</span>
    </div>
  )
}