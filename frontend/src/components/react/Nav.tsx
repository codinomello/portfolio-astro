import { useState, useEffect } from 'react';

const menuItems = [
  { id: 'home', label: '[1] INÍCIO', key: '1', icon: '◆', color: 'text-cyan-400 border-cyan-400 hover:bg-cyan-400', activeBg: 'bg-cyan-400', shadow: 'shadow-cyan-400/50' },
  { id: 'about', label: '[2] SOBRE', key: '2', icon: '●', color: 'text-green-400 border-green-400 hover:bg-green-400', activeBg: 'bg-green-400', shadow: 'shadow-green-400/50' },
  { id: 'skills', label: '[3] HABILIDADES', key: '3', icon: '■', color: 'text-yellow-400 border-yellow-400 hover:bg-yellow-400', activeBg: 'bg-yellow-400', shadow: 'shadow-yellow-400/50' },
  { id: 'projects', label: '[4] PROJETOS', key: '4', icon: '▲', color: 'text-fuchsia-400 border-fuchsia-400 hover:bg-fuchsia-400', activeBg: 'bg-fuchsia-400', shadow: 'shadow-fuchsia-400/50' },
  { id: 'contact', label: '[5] CONTATO', key: '5', icon: '♦', color: 'text-red-400 border-red-400 hover:bg-red-400', activeBg: 'bg-red-400', shadow: 'shadow-red-400/50' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Cálculo de posição para compensar a nav fixa (sticky)
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = menuItems.find(item => item.key === e.key);
      if (target) {
        scrollToSection(target.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="border-4 border-double border-cyan-400 p-4 mb-6 bg-black/80 backdrop-blur-sm sticky top-4 z-50 shadow-lg shadow-cyan-400/20 font-vga">
      <div className="flex flex-wrap gap-3 justify-center">
        {menuItems.map(item => {
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                ${item.color} 
                px-5 py-3 border-2 transition-all duration-200 font-bold text-sm md:text-base cursor-pointer
                ${isActive 
                  ? `${item.activeBg} text-black shadow-lg ${item.shadow}` 
                  : 'bg-black hover:text-black'
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}