import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: "input",
    title: "CT Scan Input",
    description: "DICOM files uploaded securely",
    icon: "ri-upload-cloud-2-line",
    xPct: 8,
    yPct: 50,
    connections: ["preprocessing"],
    delay: 0,
  },
  {
    id: "preprocessing",
    title: "Image Processing",
    description: "Noise reduction & enhancement",
    icon: "ri-image-edit-line",
    xPct: 28,
    yPct: 20,
    connections: ["detection"],
    delay: 900,
  },
  {
    id: "detection",
    title: "Nodule Detection",
    description: "AI identifies suspicious regions",
    icon: "ri-search-2-line",
    xPct: 50,
    yPct: 50,
    connections: ["classification", "gradcam"],
    delay: 1800,
  },
  {
    id: "classification",
    title: "Classification",
    description: "Benign vs malignant analysis",
    icon: "ri-pie-chart-line",
    xPct: 73,
    yPct: 22,
    connections: ["results"],
    delay: 2700,
  },
  {
    id: "gradcam",
    title: "Grad-CAM Analysis",
    description: "Explainable AI visualization",
    icon: "ri-eye-line",
    xPct: 73,
    yPct: 78,
    connections: ["results"],
    delay: 3200,
  },
  {
    id: "results",
    title: "Clinical Report",
    description: "Comprehensive diagnostic report",
    icon: "ri-file-text-line",
    xPct: 92,
    yPct: 50,
    connections: [],
    delay: 3900,
  },
];

const NODE_RADIUS = 28; // px, matches w-14/2 = 28px
const SVG_W = 1000;
const SVG_H = 340;

function getCenter(step) {
  return {
    x: (step.xPct / 100) * SVG_W,
    y: (step.yPct / 100) * SVG_H,
  };
}

function getEdgePoint(from, to) {
  const a = getCenter(from);
  const b = getCenter(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return {
    x: a.x + (dx / dist) * (NODE_RADIUS + 2),
    y: a.y + (dy / dist) * (NODE_RADIUS + 2),
  };
}

function getArrowEndPoint(from, to) {
  const a = getCenter(from);
  const b = getCenter(to);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return {
    x: b.x - (dx / dist) * (NODE_RADIUS + 6),
    y: b.y - (dy / dist) * (NODE_RADIUS + 6),
  };
}

function buildPath(from, to) {
  const start = getEdgePoint(from, to);
  const end = getArrowEndPoint(from, to);
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  // Perpendicular offset for a gentle curve
  const curve = 0.18;
  const cpx = mx - dy * curve;
  const cpy = my + dx * curve;
  return { d: `M ${start.x},${start.y} Q ${cpx},${cpy} ${end.x},${end.y}`, cpx, cpy };
}

// Animated packet that travels along an SVG path
function Packet({ pathD, active, color }) {
  const pathRef = useRef(null);
  const circleRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active || !pathRef.current || !circleRef.current) return;
    const path = pathRef.current;
    const circle = circleRef.current;
    const len = path.getTotalLength();
    let start = null;
    const dur = 700;

    function step(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pt = path.getPointAtLength(eased * len);
      circle.setAttribute("cx", pt.x);
      circle.setAttribute("cy", pt.y);
      circle.setAttribute("opacity", t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1);
      if (t < 1) animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      {active && (
        <circle ref={circleRef} r="4.5" fill={color} cx={0} cy={0} />
      )}
    </g>
  );
}

export default function AnimatedArchitecture() {
  const [activeStep, setActiveStep] = useState(null);
  const [visitedSteps, setVisitedSteps] = useState(new Set());
  const [activeEdges, setActiveEdges] = useState(new Set());
  const [packetEdges, setPacketEdges] = useState(new Set());
  const [flowActive, setFlowActive] = useState(false);

  const handleToggle = (id) => {
    if (flowActive) return;
    setActiveStep((prev) => (prev === id ? null : id));
  };

  const startAnimation = () => {
    if (flowActive) return;
    setFlowActive(true);
    setActiveStep(null);
    setVisitedSteps(new Set());
    setActiveEdges(new Set());
    setPacketEdges(new Set());

    const timers = [];

    STEPS.forEach((step) => {
      const t1 = setTimeout(() => {
        setActiveStep(step.id);
        setVisitedSteps((prev) => new Set([...prev, step.id]));

        step.connections.forEach((connId) => {
          const edgeKey = `${step.id}-${connId}`;
          const t2 = setTimeout(() => {
            setActiveEdges((prev) => new Set([...prev, edgeKey]));
            setPacketEdges((prev) => new Set([...prev, edgeKey]));
            const t3 = setTimeout(() => {
              setPacketEdges((prev) => {
                const next = new Set(prev);
                next.delete(edgeKey);
                return next;
              });
            }, 750);
            timers.push(t3);
          }, 200);
          timers.push(t2);
        });
      }, step.delay);
      timers.push(t1);
    });

    const maxDelay = Math.max(...STEPS.map((s) => s.delay));
    const tEnd = setTimeout(() => {
      setFlowActive(false);
      setActiveStep(null);
    }, maxDelay + 1600);
    timers.push(tEnd);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          System Architecture Flow
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto mb-5">
          Watch how DeepLung processes CT scans through our AI pipeline — from
          upload to diagnostic report.
        </p>
        <button
          onClick={startAnimation}
          disabled={flowActive}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${flowActive
              ? "bg-blue-100 text-blue-400 cursor-not-allowed dark:bg-blue-900/30 dark:text-blue-500"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm"
            }`}
        >
          <i className={`${flowActive ? "ri-loader-4-line animate-spin" : "ri-play-line"}`} />
          {flowActive ? "Processing…" : "Run Pipeline"}
        </button>
      </div>

      {/* Flow Canvas */}
      <div className="relative bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/60 rounded-2xl overflow-hidden"
        style={{ height: 340 }}>

        {/* SVG layer — connections only */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <marker
              id="arrowBlue"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M2 2L8 5L2 8"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id="arrowGray"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M2 2L8 5L2 8"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {STEPS.map((step) =>
            step.connections.map((connId) => {
              const target = STEPS.find((s) => s.id === connId);
              if (!target) return null;
              const edgeKey = `${step.id}-${connId}`;
              const isActive = activeEdges.has(edgeKey);
              const hasPacket = packetEdges.has(edgeKey);
              const { d } = buildPath(step, target);

              return (
                <g key={edgeKey}>
                  {/* Base path */}
                  <path
                    d={d}
                    fill="none"
                    stroke={isActive ? "#3B82F6" : "#D1D5DB"}
                    strokeWidth={isActive ? 1.8 : 1.2}
                    strokeLinecap="round"
                    markerEnd={isActive ? "url(#arrowBlue)" : "url(#arrowGray)"}
                    className="transition-all duration-300"
                  />
                  {/* Packet animation */}
                  <Packet pathD={d} active={hasPacket} color="#3B82F6" />
                </g>
              );
            })
          )}
        </svg>

        {/* Node elements — positioned with percentages */}
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isVisited = visitedSteps.has(step.id);

          return (
            <div
              key={step.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${step.xPct}%`, top: `${step.yPct}%` }}
            >
              {/* Tooltip */}
              {isActive && !flowActive && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 dark:bg-gray-700 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg z-20">
                  {step.description}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
                </div>
              )}

              <button
                onClick={() => handleToggle(step.id)}
                className={`
                  w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5
                  border transition-all duration-300 outline-none
                  ${isActive && !flowActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40 scale-110"
                    : isVisited && flowActive
                      ? "bg-blue-600 border-blue-500 text-white scale-110 shadow-lg shadow-blue-200 dark:shadow-blue-900/40"
                      : isVisited
                        ? "bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:shadow-sm"
                  }
                `}
                style={
                  isVisited && flowActive
                    ? { animation: "pulseRing 1.4s ease-out infinite" }
                    : undefined
                }
              >
                <i className={`${step.icon} text-base`} />
                <span className="text-[8px] font-medium leading-tight text-center px-1">
                  {step.title}
                </span>
              </button>
            </div>
          );
        })}

        <style>{`
          @keyframes pulseRing {
            0%   { box-shadow: 0 0 0 0 rgba(59,130,246,0.45); }
            60%  { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
            100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
          }
        `}</style>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STEPS.map((step, index) => {
          const isActive = activeStep === step.id && !flowActive;
          const isVisited = visitedSteps.has(step.id);
          return (
            <button
              key={step.id}
              onClick={() => handleToggle(step.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 outline-none ${isActive
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                  : isVisited
                    ? "border-blue-200 bg-white dark:bg-gray-800 dark:border-blue-800"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isActive
                      ? "bg-blue-600 text-white"
                      : isVisited
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                >
                  <i className={`${step.icon} text-sm`} />
                </div>
                <span
                  className={`text-xs font-semibold ${isActive
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-800 dark:text-white"
                    }`}
                >
                  {step.title}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "ri-time-line", color: "blue", value: "<60s", label: "Processing time" },
          { icon: "ri-cpu-line", color: "green", value: "95.7%", label: "Accuracy" },
          { icon: "ri-cloud-line", color: "purple", value: "Cloud", label: "Scalable infra" },
          { icon: "ri-shield-check-line", color: "orange", value: "HIPAA", label: "Compliant" },
        ].map(({ icon, color, value, label }) => {
          const colorMap = {
            blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
            purple: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
            orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
          };
          return (
            <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <div className={`w-11 h-11 rounded-full ${colorMap[color]} flex items-center justify-center mx-auto mb-3`}>
                <i className={`${icon} text-xl`} />
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}