const stars = [
  { cx: 45, cy: 18, delay: 0 },
  { cx: 120, cy: 60, delay: 2.4 },
  { cx: 175, cy: 28, delay: 4.1 },
  { cx: 230, cy: 90, delay: 1.0 },
  { cx: 310, cy: 35, delay: 3.2 },
  { cx: 365, cy: 115, delay: 0.7 },
  { cx: 400, cy: 150, delay: 5.3 },
  { cx: 440, cy: 48, delay: 2.0 },
  { cx: 480, cy: 80, delay: 4.6 },
  { cx: 530, cy: 22, delay: 1.5 },
  { cx: 550, cy: 120, delay: 3.8 },
  { cx: 610, cy: 55, delay: 0.3 },
  { cx: 650, cy: 25, delay: 5.0 },
  { cx: 700, cy: 100, delay: 2.7 },
  { cx: 730, cy: 135, delay: 1.2 },
  { cx: 790, cy: 55, delay: 4.4 },
  { cx: 830, cy: 15, delay: 0.9 },
  { cx: 850, cy: 100, delay: 3.5 },
  { cx: 920, cy: 40, delay: 5.7 },
  { cx: 960, cy: 130, delay: 1.8 },
  { cx: 1000, cy: 70, delay: 4.0 },
  { cx: 1050, cy: 145, delay: 2.3 },
  { cx: 1100, cy: 32, delay: 0.5 },
  { cx: 1140, cy: 115, delay: 3.1 },
  { cx: 1180, cy: 30, delay: 5.5 },
  { cx: 1220, cy: 85, delay: 1.6 },
  { cx: 1250, cy: 95, delay: 4.8 },
  { cx: 1290, cy: 42, delay: 0.2 },
  { cx: 1320, cy: 65, delay: 3.6 },
  { cx: 1355, cy: 125, delay: 2.1 },
  { cx: 1380, cy: 20, delay: 5.2 },
  { cx: 1400, cy: 75, delay: 1.3 },
  { cx: 1430, cy: 110, delay: 4.3 },
  { cx: 80, cy: 140, delay: 3.0 },
  { cx: 155, cy: 105, delay: 5.9 },
  { cx: 280, cy: 145, delay: 0.8 },
  { cx: 505, cy: 155, delay: 2.6 },
  { cx: 670, cy: 140, delay: 4.7 },
  { cx: 770, cy: 160, delay: 1.1 },
  { cx: 890, cy: 150, delay: 3.4 },
  { cx: 1030, cy: 160, delay: 5.1 },
  { cx: 1160, cy: 155, delay: 0.6 },
  { cx: 1310, cy: 150, delay: 2.9 },
  { cx: 30, cy: 50, delay: 4.2 },
  { cx: 340, cy: 70, delay: 1.7 },
];

export function ForestBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      {/* Twinkling stars */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="xMidYMin slice"
      >
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={i % 3 === 0 ? 1 : 0.6}
            fill="#c4a35a"
            className="animate-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}
      </svg>

      {/* Bottom forest silhouette layer */}
      <svg
        className="absolute bottom-0 w-full opacity-[0.08]"
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
        style={{ color: "#2d5a3d" }}
      >
        {/* Back layer — distant trees */}
        <path d="M0,500 L0,320 Q30,280 40,320 Q50,220 60,320 Q70,260 80,320 Q100,200 120,320 Q130,270 140,320 Q160,230 180,320 Q190,280 200,320 Q220,190 240,320 Q250,260 260,320 Q280,240 300,320 Q310,280 320,320 Q340,210 360,320 Q380,260 400,320 Q410,290 420,320 Q440,220 460,320 Q480,250 500,320 Q510,280 520,320 Q540,200 560,320 Q580,270 600,320 Q610,290 620,320 Q640,230 660,320 Q680,260 700,320 Q720,210 740,320 Q750,270 760,320 Q780,240 800,320 Q820,280 840,320 Q850,220 860,320 Q880,260 900,320 Q920,200 940,320 Q950,270 960,320 Q980,240 1000,320 Q1020,280 1040,320 Q1050,210 1060,320 Q1080,250 1100,320 Q1120,230 1140,320 Q1160,270 1180,320 Q1200,220 1220,320 Q1240,260 1260,320 Q1280,200 1300,320 Q1320,270 1340,320 Q1360,240 1380,320 Q1400,280 1420,320 Q1430,260 1440,320 L1440,500 Z" />
      </svg>

      {/* Mid layer — closer trees */}
      <svg
        className="absolute bottom-0 w-full opacity-[0.06]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
        style={{ color: "#1a3a25" }}
      >
        <path d="M0,400 L0,340 Q20,300 30,340 Q40,270 55,340 Q65,310 75,340 Q90,250 110,340 Q125,290 135,340 Q150,260 170,340 Q185,300 195,340 Q215,240 235,340 Q245,290 260,340 Q280,270 300,340 Q315,300 330,340 Q345,250 365,340 Q380,290 395,340 Q410,260 430,340 Q445,300 460,340 Q475,230 495,340 Q510,280 525,340 Q540,260 560,340 Q575,300 590,340 Q610,240 630,340 Q645,280 660,340 Q680,270 700,340 Q715,300 730,340 Q750,250 770,340 Q785,290 800,340 Q820,260 840,340 Q855,300 870,340 Q890,240 910,340 Q925,280 940,340 Q960,270 980,340 Q995,300 1010,340 Q1030,250 1050,340 Q1065,290 1080,340 Q1100,260 1120,340 Q1140,300 1160,340 Q1175,240 1195,340 Q1210,280 1225,340 Q1245,270 1265,340 Q1280,300 1300,340 Q1315,250 1335,340 Q1350,290 1370,340 Q1390,260 1410,340 Q1425,300 1440,340 L1440,400 Z" />
      </svg>

      {/* Front layer — closest trees */}
      <svg
        className="absolute bottom-0 w-full opacity-[0.045]"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
        style={{ color: "#0f2518" }}
      >
        <path d="M0,300 L0,260 Q15,230 25,260 Q35,200 50,260 Q60,240 70,260 Q85,190 105,260 Q120,230 130,260 Q145,200 165,260 Q180,240 190,260 Q210,180 230,260 Q245,220 255,260 Q275,200 295,260 Q310,240 325,260 Q340,190 360,260 Q375,230 390,260 Q405,200 425,260 Q440,240 455,260 Q470,180 490,260 Q505,220 520,260 Q535,200 555,260 Q570,240 585,260 Q600,190 620,260 Q635,230 650,260 Q670,200 690,260 Q705,240 720,260 Q740,180 760,260 Q775,220 790,260 Q810,200 830,260 Q845,240 860,260 Q875,190 895,260 Q910,230 925,260 Q945,200 965,260 Q980,240 995,260 Q1010,180 1030,260 Q1045,220 1060,260 Q1080,200 1100,260 Q1115,240 1130,260 Q1150,190 1170,260 Q1185,230 1200,260 Q1220,200 1240,260 Q1255,240 1270,260 Q1290,180 1310,260 Q1325,220 1340,260 Q1360,200 1380,260 Q1395,240 1410,260 Q1425,230 1440,260 L1440,300 Z" />
      </svg>

      {/* Very subtle vertical mist gradient over the trees */}
      <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
