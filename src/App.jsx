import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, useSpring } from 'framer-motion';
import { Camera, Battery, Wind, Mic, Clock, Cpu } from 'lucide-react';

// Apple-style scroll-driven camera parts annotation
const EcosystemSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  // 5 parts — each gets its own scroll window [start, peak, end]
  const parts = [
    {
      id: 'oar',
      label: 'OAR POD',
      sub: 'Top-mount multi-controller. Seamless operational command, always at hand.',
      // SVG line: from dot on image to label box — % coords relative to image wrapper
      dot:   { x: '61%', y: '10%' },
      line:  { x1: '61%', y1: '10%', x2: '82%', y2: '6%' },
      anchor: 'right',
      labelPos: { left: 'auto', right: '0%', top: '2%' },
      window: [0, 0.15, 0.28],
    },
    {
      id: 'lens',
      label: 'Cinema Lens Assembly',
      sub: 'Nine-element precision optics. Razor-sharp across the full 7K open gate.',
      dot:   { x: '18%', y: '48%' },
      line:  { x1: '18%', y1: '48%', x2: '2%', y2: '36%' },
      anchor: 'left',
      labelPos: { left: '0%', right: 'auto', top: '30%' },
      window: [0.18, 0.33, 0.46],
    },
    {
      id: 'pcb',
      label: 'DIGIC X Processor',
      sub: 'Dual-chip image pipeline. 7K RAW processed in real-time, losslessly.',
      dot:   { x: '78%', y: '44%' },
      line:  { x1: '78%', y1: '44%', x2: '96%', y2: '36%' },
      anchor: 'right',
      labelPos: { left: 'auto', right: '0%', top: '28%' },
      window: [0.36, 0.51, 0.64],
    },
    {
      id: 'mount',
      label: 'RF / PL Lens Mount',
      sub: 'Reinforced cinema-lock bayonet. Interchangeable RF and PL in seconds.',
      dot:   { x: '56%', y: '52%' },
      line:  { x1: '56%', y1: '52%', x2: '2%', y2: '64%' },
      anchor: 'left',
      labelPos: { left: '0%', right: 'auto', top: '58%' },
      window: [0.54, 0.69, 0.82],
    },
    {
      id: 'base',
      label: 'Base Plate & Rod Rail',
      sub: '15mm rod-standard base. Lock any rig, shoulder mount, or gimbal instantly.',
      dot:   { x: '55%', y: '82%' },
      line:  { x1: '55%', y1: '82%', x2: '82%', y2: '90%' },
      anchor: 'right',
      labelPos: { left: 'auto', right: '0%', top: '82%' },
      window: [0.72, 0.87, 1],
    },
  ];

  return (
    <section
      id="ecosystem"
      ref={containerRef}
      className="relative bg-[#050505] border-t border-[#1a1a1a]"
      style={{ height: '550vh' }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.22, 0.08], rotate: [0, 90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#E31B23] blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.04, 0.14, 0.04], x: [0, 80, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#ff2a35] blur-[180px] rounded-full"
        />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 px-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-3">
            Professional <span className="text-[#E31B23]">Ecosystem</span>
          </h2>
          <p className="text-lg text-gray-400">A completely modular design engineered for the reality of set life.</p>
        </motion.div>

        {/* Image + annotation canvas */}
        <div className="relative w-full max-w-5xl mx-auto px-6" style={{ aspectRatio: '16/9' }}>

          {/* Camera image */}
          <motion.img
            src="/assets/images/camera_parts.png"
            alt="Modular Camera Parts"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ mixBlendMode: 'screen' }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* SVG overlay for lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ pointerEvents: 'none' }}
          >
            {parts.map((part) => (
              <PartLine key={part.id} part={part} smooth={smooth} />
            ))}
          </svg>

          {/* Label callouts */}
          {parts.map((part) => (
            <PartLabel key={part.id} part={part} smooth={smooth} />
          ))}

          {/* Dot markers */}
          {parts.map((part) => (
            <PartDot key={part.id} part={part} smooth={smooth} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PartLine = ({ part, smooth }) => {
  const opacity = useTransform(smooth, part.window, [0, 1, 1]);
  const pathLength = useTransform(smooth, part.window, [0, 1, 1]);
  // Convert % string to number for SVG
  const x1 = parseFloat(part.line.x1);
  const y1 = parseFloat(part.line.y1);
  const x2 = parseFloat(part.line.x2);
  const y2 = parseFloat(part.line.y2);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="#E31B23"
      strokeWidth="0.25"
      strokeLinecap="round"
      style={{ opacity, pathLength }}
      vectorEffect="non-scaling-stroke"
    />
  );
};

const PartDot = ({ part, smooth }) => {
  const opacity = useTransform(smooth, part.window, [0, 1, 1]);
  const scale = useTransform(smooth, part.window, [0, 1, 1]);
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full bg-[#E31B23] border-2 border-white shadow-[0_0_12px_rgba(227,27,35,0.9)]"
      style={{
        left: part.dot.x,
        top: part.dot.y,
        transform: 'translate(-50%, -50%)',
        opacity,
        scale,
      }}
    />
  );
};

const PartLabel = ({ part, smooth }) => {
  const opacity = useTransform(smooth, part.window, [0, 1, 1]);
  const x = useTransform(
    smooth,
    part.window,
    part.anchor === 'left' ? [-24, 0, 0] : [24, 0, 0]
  );
  return (
    <motion.div
      className="absolute w-52"
      style={{
        ...part.labelPos,
        opacity,
        x,
      }}
    >
      <div
        className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${
          part.anchor === 'right' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="text-[#E31B23] font-mono text-[10px] tracking-widest uppercase mb-1">Module</div>
        <div className="text-white font-bold text-sm leading-tight mb-1">{part.label}</div>
        <div className="text-gray-400 text-xs leading-relaxed">{part.sub}</div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (targetId === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute w-full z-50 top-0 left-0 bg-transparent pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => handleNavClick(e, '#top')}>
          <img src="/favicon.svg" alt="WindAge Logo" className="w-8 h-8" />
          <span className="text-xl font-black tracking-widest text-[#f5f5f5]">WINDAGE</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <a href="#overview" onClick={(e) => handleNavClick(e, '#overview')} className="text-gray-300 hover:text-white transition-colors">Overview</a>
          <a href="#tech-specs" onClick={(e) => handleNavClick(e, '#tech-specs')} className="text-gray-300 hover:text-white transition-colors">Tech Specs</a>
          <a href="#ecosystem" onClick={(e) => handleNavClick(e, '#ecosystem')} className="text-gray-300 hover:text-white transition-colors">Ecosystem</a>
        </div>
        <div>
          <a href="#order" onClick={(e) => handleNavClick(e, '#order')} className="inline-block bg-[#E31B23] hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-md">
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const HeroSequence = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0005
  });

  useEffect(() => {
    // Preload image stack natively
    for (let i = 2; i <= 80; i++) {
      const img = new window.Image();
      img.src = `/assets/hero/${i.toString().padStart(2, '0')}.png`; 
    }
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!imgRef.current) return;
    const frameIndex = Math.min(Math.floor(latest * 78), 78) + 2;
    const targetSrc = `/assets/hero/${frameIndex.toString().padStart(2, '0')}.png`;
    if (imgRef.current.getAttribute("src") !== targetSrc) {
       imgRef.current.src = targetSrc;
    }
  });

  // Apple-style image effects
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.04, 0.92, 1], [0.8, 1, 1, 1]);

  // Spread text phases evenly across 1200vh (0→0.33→0.66→1)
  const t1Opacity = useTransform(smoothProgress, [0, 0.04, 0.16, 0.26], [0, 1, 1, 0]);
  const t1Y = useTransform(smoothProgress, [0, 0.04, 0.16, 0.26], [60, 0, 0, -60]);
  const t1Scale = useTransform(smoothProgress, [0, 0.04, 0.16, 0.26], [1.05, 1, 1, 0.97]);

  const t2Opacity = useTransform(smoothProgress, [0.33, 0.42, 0.55, 0.63], [0, 1, 1, 0]);
  const t2Y = useTransform(smoothProgress, [0.33, 0.42, 0.55, 0.63], [60, 0, 0, -60]);
  const t2Scale = useTransform(smoothProgress, [0.33, 0.42, 0.55, 0.63], [1.05, 1, 1, 0.97]);

  const t3Opacity = useTransform(smoothProgress, [0.68, 0.77, 0.9, 1], [0, 1, 1, 1]);
  const t3Y = useTransform(smoothProgress, [0.68, 0.77, 0.9, 1], [60, 0, 0, -20]);
  const t3Scale = useTransform(smoothProgress, [0.68, 0.77, 0.9, 1], [1.05, 1, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[1200vh]" style={{ position: 'relative' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Navbar />
        
        <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0 flex items-center justify-center pt-20">
            <img 
               ref={imgRef}
               src="/assets/hero/02.png" 
               className="w-full h-full object-cover object-center" 
               alt="Hero sequence"
            />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
          <motion.div style={{ opacity: t1Opacity, y: t1Y, scale: t1Scale }} className="absolute top-20 left-8 md:top-32 md:left-24 text-left pointer-events-none">
            <h3 className="text-[#E31B23] font-mono tracking-widest text-sm md:text-base font-bold uppercase mb-2 drop-shadow-md">Overview</h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-3 leading-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              The Future of <br/>
              Open Gate.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium drop-shadow-md max-w-xs">Full-frame 7K RAW. Cinematography Redefined.</p>
          </motion.div>

          <motion.div style={{ opacity: t2Opacity, y: t2Y, scale: t2Scale }} className="absolute bottom-20 right-8 md:bottom-32 md:right-24 text-right pointer-events-none">
            <h3 className="text-[#E31B23] font-mono tracking-widest text-sm md:text-base font-bold uppercase mb-2 drop-shadow-md">Autofocus</h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-3 leading-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Unrivaled Precision.<br/>
              Dual Pixel AF II.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium drop-shadow-md max-w-xs ml-auto">Tracking every move with zero compromise.</p>
          </motion.div>

          <motion.div style={{ opacity: t3Opacity, y: t3Y, scale: t3Scale }} className="absolute top-1/2 -translate-y-1/2 left-8 md:left-24 text-left pointer-events-none">
            <h3 className="text-[#E31B23] font-mono tracking-widest text-sm md:text-base font-bold uppercase mb-2 drop-shadow-md">Color</h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-3 leading-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Endless Control.<br/>
              Cinema Grading.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium drop-shadow-md max-w-xs">Unmatched dynamic range & tonality.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function App() {
  const [activeModule, setActiveModule] = useState(null);

  // Always start at the top of the hero section on page load/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const stats = [
    { res: '7K', fps: '60p', type: 'RAW' },
    { res: '4K', fps: '120p', type: '10-bit 4:2:2' },
    { res: '2K', fps: '180p', type: 'Slow Motion' },
  ];

  const modules = [
    {
      id: 'oar',
      title: 'OAR POD',
      desc: 'Top-mount accessory control for seamless operational flow on set.',
      x: '50%',
      y: '20%',
      icon: <Camera size={24} />
    },
    {
      id: 'xlr',
      title: 'XLR Terminals',
      desc: 'Professional audio interface delivering pristine multi-channel sound.',
      x: '30%',
      y: '45%',
      icon: <Mic size={24} />
    },
    {
      id: 'timecode',
      title: 'Time Code',
      desc: 'Frame-accurate multi-cam sync for demanding editorial pipelines.',
      x: '70%',
      y: '55%',
      icon: <Clock size={24} />
    },
    {
      id: 'cooling',
      title: 'Active Cooling',
      desc: 'Internal fan system guaranteeing unlimited recording without overheating.',
      x: '45%',
      y: '65%',
      icon: <Wind size={24} />
    }
  ];

  return (
    <div className="bg-[#050505] text-[#f5f5f5] min-h-screen font-sans selection:bg-[#E31B23] selection:text-white">
      
      {/* SECTION 1: HERO (Scroll Sequence) */}
      <HeroSequence />

      {/* SECTION 2: SENSOR & SPEED */}
      <section id="overview" className="py-32 px-6 relative border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Full-Frame <br/> <span className="text-[#E31B23]">Brilliance</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              The custom 3:2 CMOS sensor with Open Gate readout captures more vertical resolution, 
              giving you the ultimate flexibility to reframe for premium large format or anamorphic delivery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="border border-[#2a2a2a] bg-[#0c0c0c] p-6 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#E31B23] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <h3 className="text-4xl font-bold mb-1 group-hover:text-[#E31B23] transition-colors">{stat.res}</h3>
                  <div className="text-2xl font-semibold text-gray-300 mb-2">{stat.fps}</div>
                  <div className="text-sm text-gray-500 font-mono">{stat.type}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sensor Graphic Pulse */}
          <motion.div 
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              animate={{ boxShadow: ['0 0 0 0 rgba(227, 27, 35, 0)', '0 0 40px 10px rgba(227, 27, 35, 0.3)', '0 0 0 0 rgba(227, 27, 35, 0)'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full rounded-2xl"
            />
            <div className="relative z-10 p-2 bg-gradient-to-br from-[#1a1a1a] to-[#050505] rounded-3xl border border-[#2a2a2a] shadow-2xl">
              <img 
                src="/camera_sensor.png" 
                alt="3:2 CMOS Sensor" 
                className="w-full max-w-md rounded-2xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: MODULAR ECOSYSTEM — Apple-style scroll annotations */}
      <EcosystemSection />

      {/* SECTION 4: TECHNICAL SPECS TABLE */}
      <section id="tech-specs" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 border-b border-[#2a2a2a] pb-6">
            Integrated Accessories
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm md:text-base border-collapse">
              <thead>
                <tr className="text-gray-500 border-b border-[#2a2a2a]">
                  <th className="py-4 px-4 font-normal">Component</th>
                  <th className="py-4 px-4 font-normal">Specification</th>
                  <th className="py-4 px-4 font-normal">Interface</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-[#1a1a1a] hover:bg-[#0c0c0c] transition-colors">
                  <td className="py-5 px-4 font-semibold text-white">Top-mount Core</td>
                  <td className="py-5 px-4 text-gray-400">OAR POD Multi-controller</td>
                  <td className="py-5 px-4 text-[#E31B23]">Cold Shoe / Pogo Pin</td>
                </tr>
                <tr className="border-b border-[#1a1a1a] hover:bg-[#0c0c0c] transition-colors">
                  <td className="py-5 px-4 font-semibold text-white">Audio Module</td>
                  <td className="py-5 px-4 text-gray-400">24-bit 48kHz, 4-Channel</td>
                  <td className="py-5 px-4 text-[#E31B23]">Dual XLR / 3.5mm</td>
                </tr>
                <tr className="border-b border-[#1a1a1a] hover:bg-[#0c0c0c] transition-colors">
                  <td className="py-5 px-4 font-semibold text-white">Lens Mount</td>
                  <td className="py-5 px-4 text-gray-400">Reinforced Cinema Lock</td>
                  <td className="py-5 px-4 text-[#E31B23]">RF / PL Interchangeable</td>
                </tr>
                <tr className="border-b border-[#1a1a1a] hover:bg-[#0c0c0c] transition-colors">
                  <td className="py-5 px-4 font-semibold text-white">Power System</td>
                  <td className="py-5 px-4 text-gray-400">V-Mount / Gold Mount options</td>
                  <td className="py-5 px-4 text-[#E31B23]">4-pin XLR DC-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: PERFORMANCE FOOTER */}
      <footer id="order" className="relative py-40 overflow-hidden bg-[#0a0a0a] border-t border-[#1a1a1a]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#E31B23] opacity-5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter"
          >
            Future-<span className="text-[#E31B23]">Proof</span> <br/> Performance.
          </motion.h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold mb-2">CFexpress</div>
              <div className="text-gray-400 uppercase tracking-widest text-sm">Dual Type B Slots</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-4xl font-mono font-bold mb-2">8K 60p</div>
              <div className="text-gray-400 uppercase tracking-widest text-sm">Internal RAW Ready</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-[#2a2a2a]" />
            <div className="text-center">
              <div className="text-4xl font-mono font-bold mb-2">Wi-Fi 6E</div>
              <div className="text-gray-400 uppercase tracking-widest text-sm">Ultra-fast Transfer</div>
            </div>
          </div>

          <button className="bg-[#E31B23] hover:bg-white hover:text-[#050505] transition-all duration-300 text-white px-10 py-5 rounded-full font-bold text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(227,27,35,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            Pre-Order WindAge
          </button>
        </div>
        
        <div className="absolute bottom-8 left-0 w-full text-center text-gray-600 text-sm font-mono">
          © 2026 WindAge Cinematic Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
