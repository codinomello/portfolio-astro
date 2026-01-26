import { useState, useEffect } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  icon: string;
}

export default function SkillBar({ name, level, color, icon }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2 items-center">
        <span className="font-bold flex items-center gap-2" style={{ color: `${color}` }}>
          <span className="text-xl">{icon}</span>
          {name}
        </span>
        <span className="text-cyan-400 font-bold text-lg">{level}%</span>
      </div>
      <div className="border-2 border-green-400 h-10 relative overflow-hidden bg-black shadow-inner">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out flex items-center justify-center relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}