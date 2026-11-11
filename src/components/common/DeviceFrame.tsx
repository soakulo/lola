import React from 'react';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-dvh w-full overflow-x-hidden bg-[#FAF7F2] font-['Nunito',sans-serif] text-neutral-900">
    <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#FAF7F2]">
      {children}
    </div>
  </div>
);
