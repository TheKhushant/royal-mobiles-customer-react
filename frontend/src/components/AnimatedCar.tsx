// import React from "react";

const AnimatedCar = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16">
  {/* Night Sky Stars */}
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.8 + 0.2,
        }}
      />
    ))}
  </div>

  {/* Moon */}
  <div className="absolute top-8 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-[0_0_60px_rgba(255,255,255,0.3)]">
    <div className="absolute top-4 left-6 w-6 h-6 rounded-full bg-slate-400/20" />
    <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-slate-400/20" />
    <div className="absolute bottom-6 left-4 w-3 h-3 rounded-full bg-slate-400/20" />
  </div>

  {/* City Skyline Silhouette */}
  <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end opacity-30">
    <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
      <path d="M0,200 L0,120 L40,120 L40,80 L80,80 L80,140 L120,140 L120,60 L160,60 L160,100 L200,100 L200,150 L240,150 L240,90 L280,90 L280,130 L320,130 L320,70 L360,70 L360,110 L400,110 L400,160 L440,160 L440,85 L480,85 L480,125 L520,125 L520,95 L560,95 L560,145 L600,145 L600,75 L640,75 L640,115 L680,115 L680,155 L720,155 L720,80 L760,80 L760,120 L800,120 L800,140 L840,140 L840,65 L880,65 L880,105 L920,105 L920,150 L960,150 L960,90 L1000,90 L1000,130 L1040,130 L1040,70 L1080,70 L1080,110 L1120,110 L1120,160 L1160,160 L1160,85 L1200,85 L1200,200 Z" fill="#1e293b" />
    </svg>
  </div>

  {/* Road */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
    {/* Road Surface */}
    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-600 to-slate-700">
      {/* Road Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-1 flex">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="h-full bg-yellow-400/60 mx-8"
            style={{ width: '40px', animation: `roadMove 2s linear infinite` }}
          />
        ))}
      </div>
    </div>
    {/* Curb */}
    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500" />
  </div>

  {/* Street Lights */}
  <div className="absolute bottom-32 left-0 right-0 flex justify-around">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="relative">
        <div className="w-2 h-32 bg-slate-600 mx-auto" />
        <div className="w-12 h-4 bg-yellow-200/80 rounded-full -mt-1 mx-auto shadow-[0_0_30px_rgba(253,224,71,0.4)]" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-200/5 rounded-full blur-xl" />
      </div>
    ))}
  </div>

  {/* Car Container */}
  <div className="relative h-64 flex items-end justify-center pb-8">
    
  </div>

  {/* Speed Lines */}
  

  <style>{`
    @keyframes roadMove {
      from { transform: translateX(0); }
      to { transform: translateX(-200px); }
    }

    @keyframes speedLine {
      from { transform: translateX(120vw); opacity: 0; }
      50% { opacity: 0.6; }
      to { transform: translateX(-100px); opacity: 0; }
    }

    @keyframes exhaust {
      0% { transform: translateX(0) scale(1); opacity: 0.6; }
      100% { transform: translateX(-60px) scale(2.5); opacity: 0; }
    }

    @keyframes suspension {
      0%, 100% { transform: translateY(0); }
      25% { transform: translateY(-1.5px); }
      50% { transform: translateY(0.5px); }
      75% { transform: translateY(-1px); }
    }

    @keyframes bodyRoll {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(0.3deg); }
      75% { transform: rotate(-0.3deg); }
    }

    @keyframes wheelSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes driveCar {
      0% { transform: translateX(120vw); }
      100% { transform: translateX(-400px); }
    }

    @keyframes headlightGlow {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }

    @keyframes beamPulse {
      0%, 100% { opacity: 0.4; transform: scaleX(1); }
      50% { opacity: 0.6; transform: scaleX(1.05); }
    }

    .realistic-car {
      position: relative;
      width: 280px;
      height: 100px;
      animation: driveCar 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.4));
    }

    .car-body-group {
      position: absolute;
      bottom: 18px;
      left: 0;
      width: 100%;
      height: 65px;
      animation: suspension 0.8s ease-in-out infinite, bodyRoll 2s ease-in-out infinite;
    }

    .car-chassis {
      position: absolute;
      bottom: 0;
      left: 10px;
      width: 260px;
      height: 42px;
      background: linear-gradient(180deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%);
      border-radius: 12px 12px 8px 8px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.2),
        inset 0 -4px 8px rgba(0,0,0,0.3),
        0 4px 8px rgba(0,0,0,0.2);
      overflow: hidden;
    }

    .car-chassis::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);
      border-radius: 12px 12px 0 0;
    }

    .side-skirt {
      position: absolute;
      bottom: -3px;
      left: 20px;
      right: 20px;
      height: 8px;
      background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
      border-radius: 0 0 4px 4px;
    }

    .door-line {
      position: absolute;
      top: 2px;
      width: 1px;
      height: 38px;
      background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 100%);
    }

    .door-front { left: 85px; }
    .door-rear { left: 170px; }

    .door-handle {
      position: absolute;
      top: 14px;
      width: 18px;
      height: 4px;
      background: linear-gradient(180deg, #e5e7eb 0%, #9ca3af 100%);
      border-radius: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .door-handle-front { left: 92px; }
    .door-handle-rear { left: 177px; }

    .side-mirror {
      position: absolute;
      top: -8px;
      left: 75px;
      width: 16px;
      height: 10px;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      border-radius: 4px 8px 4px 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .fuel-cap {
      position: absolute;
      top: 12px;
      right: 35px;
      width: 14px;
      height: 14px;
      background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
      border-radius: 50%;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
    }

    .side-indicator {
      position: absolute;
      top: 16px;
      left: 2px;
      width: 8px;
      height: 6px;
      background: #fbbf24;
      border-radius: 2px 0 0 2px;
      box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
      animation: headlightGlow 2s ease-in-out infinite;
    }

    .car-cabin {
      position: absolute;
      bottom: 42px;
      left: 45px;
      width: 150px;
      height: 38px;
      background: linear-gradient(180deg, #1e2937 0%, #0f172a 100%);
      border-radius: 20px 20px 4px 4px;
      overflow: hidden;
    }

    .windshield {
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 35px;
      height: 32px;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(59, 130, 246, 0.1) 100%);
      transform: skewX(-15deg);
      border-radius: 4px;
    }

    .rear-window {
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(59, 130, 246, 0.1) 100%);
      transform: skewX(12deg);
      border-radius: 4px;
    }

    .side-window {
      position: absolute;
      bottom: 2px;
      height: 26px;
      background: linear-gradient(180deg, rgba(147, 197, 253, 0.25) 0%, rgba(59, 130, 246, 0.1) 100%);
      border-radius: 2px;
    }

    .window-front { left: 30px; width: 45px; }
    .window-rear { left: 80px; width: 40px; }

    .window-frame {
      position: absolute;
      bottom: 0;
      left: 75px;
      width: 4px;
      height: 28px;
      background: #1e2937;
      border-radius: 2px;
    }

    .roof {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      height: 4px;
      background: linear-gradient(90deg, #374151 0%, #6b7280 50%, #374151 100%);
      border-radius: 2px;
    }

    .car-hood {
      position: absolute;
      bottom: 38px;
      left: 0;
      width: 50px;
      height: 8px;
      background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
      border-radius: 8px 2px 0 0;
      transform: skewX(-10deg);
    }

    .car-trunk {
      position: absolute;
      bottom: 38px;
      right: 0;
      width: 40px;
      height: 8px;
      background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
      border-radius: 2px 8px 0 0;
      transform: skewX(8deg);
    }

    .bumper {
      position: absolute;
      bottom: -2px;
      height: 10px;
      background: linear-gradient(180deg, #4b5563 0%, #1f2937 100%);
      border-radius: 4px;
    }

    .bumper-front {
      left: -5px;
      width: 25px;
      border-radius: 6px 2px 4px 6px;
    }

    .bumper-rear {
      right: -5px;
      width: 25px;
      border-radius: 2px 6px 6px 4px;
    }

    .headlight-assembly {
      position: absolute;
      top: 8px;
      width: 22px;
      height: 16px;
    }

    .headlight-left { left: -8px; }
    .headlight-right { left: 8px; }

    .headlight-glass {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%);
      border-radius: 8px 2px 8px 2px;
      box-shadow: 0 0 20px rgba(253, 224, 71, 0.8), 0 0 40px rgba(253, 224, 71, 0.4);
      animation: headlightGlow 3s ease-in-out infinite;
    }

    .headlight-reflector {
      position: absolute;
      inset: 2px;
      background: linear-gradient(135deg, #fff 0%, #fef08a 100%);
      border-radius: 6px 1px 6px 1px;
    }

    .headlight-beam {
      position: absolute;
      top: 50%;
      left: -80px;
      width: 100px;
      height: 40px;
      background: linear-gradient(90deg, rgba(253, 224, 71, 0.3) 0%, transparent 100%);
      transform: translateY(-50%);
      border-radius: 50% 0 0 50%;
      filter: blur(8px);
      animation: beamPulse 4s ease-in-out infinite;
    }

    .taillight {
      position: absolute;
      top: 10px;
      right: -4px;
      width: 12px;
      height: 14px;
      background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
      border-radius: 2px 4px 2px 4px;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.6), 0 0 24px rgba(239, 68, 68, 0.3);
    }

    .taillight-left { top: 8px; }
    .taillight-right { top: 22px; }

    .grille {
      position: absolute;
      bottom: 8px;
      left: -6px;
      width: 20px;
      height: 20px;
      background: repeating-linear-gradient(
        0deg,
        #1f2937 0px,
        #1f2937 2px,
        #374151 2px,
        #374151 4px
      );
      border-radius: 4px;
      box-shadow: inset 0 0 4px rgba(0,0,0,0.5);
    }

    .license-plate {
      position: absolute;
      bottom: 2px;
      right: 15px;
      width: 50px;
      height: 12px;
      background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6px;
      font-weight: bold;
      color: #1f2937;
      letter-spacing: 1px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      border: 1px solid #d1d5db;
    }

    .wheel {
      position: absolute;
      bottom: 0;
      width: 48px;
      height: 48px;
      animation: wheelSpin 0.6s linear infinite;
    }

    .wheel-front { left: 32px; }
    .wheel-rear { right: 32px; }

    .tire {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #1f2937 0%, #111827 50%, #000 100%);
      border-radius: 50%;
      box-shadow: 
        inset 0 0 8px rgba(0,0,0,0.8),
        0 2px 8px rgba(0,0,0,0.4);
    }

    .tire-tread {
      position: absolute;
      inset: 3px;
      border: 2px dashed #374151;
      border-radius: 50%;
      opacity: 0.5;
    }

    .rim {
      position: absolute;
      inset: 8px;
      background: linear-gradient(135deg, #9ca3af 0%, #4b5563 50%, #6b7280 100%);
      border-radius: 50%;
      box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
    }

    .rim-spoke {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 14px;
      background: linear-gradient(180deg, #d1d5db 0%, #6b7280 100%);
      transform-origin: center bottom;
      margin-left: -1px;
      margin-top: -14px;
      border-radius: 1px;
    }

    .spoke-1 { transform: rotate(0deg); }
    .spoke-2 { transform: rotate(72deg); }
    .spoke-3 { transform: rotate(144deg); }
    .spoke-4 { transform: rotate(216deg); }
    .spoke-5 { transform: rotate(288deg); }

    .rim-center {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
      z-index: 2;
    }

    .brake-disc {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.6;
    }

    .wheel-arch {
      position: absolute;
      bottom: 38px;
      width: 56px;
      height: 28px;
      background: #1f2937;
      border-radius: 28px 28px 0 0;
      box-shadow: inset 0 4px 8px rgba(0,0,0,0.4);
    }

    .arch-front { left: 28px; }
    .arch-rear { right: 28px; }

    .car-shadow {
      position: absolute;
      bottom: -4px;
      left: 20px;
      width: 240px;
      height: 12px;
      background: radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(4px);
      animation: suspension 0.8s ease-in-out infinite;
    }

    .exhaust-container {
      position: absolute;
      bottom: 8px;
      left: -10px;
      width: 40px;
      height: 20px;
      overflow: visible;
    }

    .exhaust-particle {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, rgba(156, 163, 175, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      animation: exhaust 1.5s ease-out infinite;
    }

    .exhaust-particle:nth-child(1) { animation-delay: 0s; }
    .exhaust-particle:nth-child(2) { animation-delay: 0.5s; }
    .exhaust-particle:nth-child(3) { animation-delay: 1s; }
  `}</style>
</section>
    </>
  );
};

export default AnimatedCar;