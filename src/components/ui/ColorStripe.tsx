import React from 'react';

export const ColorStripe = () => (
  <div className="w-full h-[3px] flex z-20 relative shrink-0">
    <div className="flex-1 bg-[#00ddea]" />
    <div className="flex-1 bg-[#10b981]" />
    <div className="flex-1 bg-[#ef4444]" />
    <div className="flex-1 bg-[#a855f7]" />
    <div className="flex-1 bg-[#ffd700]" />
  </div>
);
