import React from 'react';

export function StandardHeader({ title, coloredPart, subtitle, accentColor, icon, rightElement = null, titleClass = "text-[38px]" }: any) {
  return (
    <div className="px-6 pt-10 pb-4 flex justify-between items-start relative z-10 gap-8">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-[10px] tracking-[0.3em] font-inter font-black uppercase mb-2 flex items-center gap-2" style={{ color: accentColor }}>
          <span className="w-4 h-[2px]" style={{ backgroundColor: accentColor }}></span>
          {icon && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
          {subtitle}
        </p>
        <h1 className={`font-massive leading-none italic tracking-tight uppercase ${titleClass}`}>
          <span className="text-white">{title} </span>
          <span style={{ color: accentColor }} className="p-0 m-0 w-auto h-auto">{coloredPart}</span>
        </h1>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}