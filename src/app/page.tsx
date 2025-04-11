// "use client"

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { 
//   CodeIcon, CalendarIcon, Users2Icon, LightbulbIcon, RocketIcon, 
//   TrendingUpIcon, Zap, Star, Laptop, ArrowRight, Code, Sparkles,
//   Cpu, Brain, NetworkIcon, FlaskConical, Layers, GlobeIcon
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";

// export default function Home() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [activeSection, setActiveSection] = useState("hero");
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [cursorHovering, setCursorHovering] = useState(false);
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     // Set loaded state after initial render for animations
//     setTimeout(() => setIsLoaded(true), 100);

//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
      
//       // Update custom cursor position with smooth animation
//       setCursorPosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
      
//       // Determine active section based on scroll position
//       const sections = ["hero", "features", "events"];
//       const sectionElements = sections.map(s => document.getElementById(s));
      
//       for (let i = sectionElements.length - 1; i >= 0; i--) {
//         const element = sectionElements[i];
//         if (element && window.scrollY >= element.offsetTop - 300) {
//           setActiveSection(sections[i]);
//           break;
//         }
//       }
//     };

//     // Track cursor hover state
//     const handleMouseOver = () => setCursorHovering(true);
//     const handleMouseOut = () => setCursorHovering(false);
    
//     // Add listeners
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", handleScroll);
//     document.querySelectorAll('button, a').forEach(el => {
//       el.addEventListener('mouseenter', handleMouseOver);
//       el.addEventListener('mouseleave', handleMouseOut);
//     });
    
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", handleScroll);
//       document.querySelectorAll('button, a').forEach(el => {
//         el.removeEventListener('mouseenter', handleMouseOver);
//         el.removeEventListener('mouseleave', handleMouseOut);
//       });
//     };
//   }, []);

//   // Update cursor styles separately for smoother animation
//   useEffect(() => {
//     if (!cursorRef.current) return;
    
//     const animateCursor = () => {
//       cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
//       requestAnimationFrame(animateCursor);
//     };
    
//     requestAnimationFrame(animateCursor);
//   }, [cursorPosition]);

//   const parallaxOffset = (intensity) => {
//     return {
//       transform: `translate(${mousePosition.x / 100 * intensity}px, ${mousePosition.y / 100 * intensity}px)`
//     };
//   };

//   return (
//     <div className="flex flex-col gap-0 bg-black text-white relative">
//       {/* Custom animated cursor */}
//       <div 
//         ref={cursorRef}
//         className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
//         style={{ 
//           transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
//           background: 'white',
//           transition: 'width 0.3s, height 0.3s, background 0.3s',
//           width: cursorHovering ? '50px' : '12px',
//           height: cursorHovering ? '50px' : '12px',
//           margin: cursorHovering ? '-25px 0 0 -25px' : '-6px 0 0 -6px'
//         }}
//       />

//       {/* Animated background overlay */}
//       <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0 pointer-events-none"></div>
      
//       {/* Neural network animated lines */}
//       <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none opacity-30">
//         <svg width="100%" height="100%" className="absolute inset-0">
//           <defs>
//             <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
//             </linearGradient>
//             <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
//             </linearGradient>
//           </defs>
          
//           {/* Generate random neural network connections */}
//           {[...Array(20)].map((_, i) => {
//             const startX = Math.random() * 100;
//             const startY = Math.random() * 100;
//             const endX = startX + (Math.random() * 30 - 15);
//             const endY = startY + (Math.random() * 30 - 5);
//             const controlX = (startX + endX) / 2 + (Math.random() * 20 - 10);
//             const controlY = (startY + endY) / 2 + (Math.random() * 20 - 10);
            
//             return (
//               <path 
//                 key={i}
//                 d={`M ${startX}% ${startY}% Q ${controlX}% ${controlY}% ${endX}% ${endY}%`}
//                 stroke={i % 2 === 0 ? 'url(#gradient1)' : 'url(#gradient2)'}
//                 strokeWidth="0.5"
//                 fill="none"
//                 opacity="0.7"
//                 className="animate-[pulse_4s_ease-in-out_infinite]"
//                 style={{ animationDelay: `${i * 0.3}s` }}
//               />
//             );
//           })}
          
//           {/* Neural nodes */}
//           {[...Array(35)].map((_, i) => {
//             const posX = Math.random() * 100;
//             const posY = Math.random() * 100;
//             const size = 0.2 + Math.random() * 0.6;
            
//             return (
//               <circle 
//                 key={`node-${i}`}
//                 cx={`${posX}%`} 
//                 cy={`${posY}%`} 
//                 r={`${size}%`}
//                 fill={i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#2563eb' : '#7c3aed'}
//                 opacity={0.5 + Math.random() * 0.5}
//                 className="animate-pulse"
//                 style={{ animationDuration: `${3 + Math.random() * 5}s` }}
//               />
//             );
//           })}
//         </svg>
//       </div>

//       {/* Hero Section */}
//       <section 
//         id="hero" 
//         className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
//       >
//         {/* Holographic lens flare */}
//         <div 
//           className="absolute w-[80vw] h-[80vw] rounded-full pointer-events-none opacity-30 mix-blend-screen" 
//           style={{
//             background: 'radial-gradient(circle, rgba(116,58,213,0.8) 0%, rgba(56,189,248,0.4) 40%, rgba(0,0,0,0) 70%)',
//             left: `calc(${mousePosition.x}px - 40vw)`,
//             top: `calc(${mousePosition.y}px - 40vw)`,
//             filter: 'blur(60px)',
//             transition: 'background 1s ease',
//           }}
//         ></div>
        
//         {/* Floating 3D objects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {/* Floating geometric shapes */}
//           <div 
//             className="absolute w-64 h-64 opacity-10 animate-float" 
//             style={{ 
//               ...parallaxOffset(2), 
//               top: '15%', 
//               right: '10%',
//               transformStyle: 'preserve-3d',
//               transform: 'rotateX(45deg) rotateY(45deg)',
//               animation: 'float 10s ease-in-out infinite, spin 20s linear infinite'
//             }}
//           >
//             <div className="absolute inset-0 border-2 border-purple-500 rounded-full"></div>
//             <div className="absolute inset-0 border-2 border-blue-500 rounded-full" style={{ transform: 'rotateX(60deg)' }}></div>
//             <div className="absolute inset-0 border-2 border-cyan-500 rounded-full" style={{ transform: 'rotateY(60deg)' }}></div>
//           </div>
          
//           <div 
//             className="absolute w-40 h-40 opacity-20 animate-float" 
//             style={{ 
//               ...parallaxOffset(-1.5), 
//               bottom: '25%', 
//               left: '15%',
//               transformStyle: 'preserve-3d',
//               animation: 'float 15s ease-in-out infinite, spin 30s linear infinite reverse'
//             }}
//           >
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateY(0deg) translateZ(20px)' }}></div>
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateY(90deg) translateZ(20px)' }}></div>
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateY(180deg) translateZ(20px)' }}></div>
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateY(270deg) translateZ(20px)' }}></div>
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateX(90deg) translateZ(20px)' }}></div>
//             <div className="absolute w-full h-full border-2 border-indigo-500" style={{ transform: 'rotateX(270deg) translateZ(20px)' }}></div>
//           </div>
//         </div>
        
//         {/* Hero content with staggered animation */}
//         <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
//           <div className="space-y-8 max-w-4xl">
//             {/* Animated badge */}
//             <div className="flex justify-center overflow-hidden" style={{ transform: `translateY(${isLoaded ? '0' : '-20px'})`, opacity: isLoaded ? 1 : 0, transition: 'transform 0.6s ease-out, opacity 0.6s ease-out' }}>
//               <Badge className="mb-4 bg-gradient-to-r from-violet-600/30 to-blue-600/30 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium border border-violet-500/20 shadow-lg shadow-violet-700/20 overflow-hidden relative group">
//                 <span className="flex items-center gap-2 relative z-10">
//                   <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-600/10 to-blue-500/10 group-hover:translate-x-full transition-transform duration-700"></span>
//                   <Cpu className="h-4 w-4 text-violet-400 animate-pulse" />
//                   <span className="text-white">College Tech Club 2025</span>
//                 </span>
//               </Badge>
//             </div>
            
//             {/* Animated headline with typing effect */}
//             <h1 
//               className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight relative"
//               style={{ 
//                 transform: `translateY(${isLoaded ? '0' : '30px'})`, 
//                 opacity: isLoaded ? 1 : 0, 
//                 transition: 'transform 0.8s ease-out 0.2s, opacity 0.8s ease-out 0.2s'
//               }}
//             >
//               <div className="relative">
//                 <span className="relative inline-block overflow-hidden">
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 animate-gradient-x">Tech</span>
//                   <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-600"></span>
//                 </span>{" "}
//                 <span className="relative inline-block overflow-hidden">
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 animate-gradient-x">Frontier</span>
//                   <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-blue-500"></span>
//                 </span>
//               </div>
              
//               {/* Futuristic glitch effect */}
//               <div className="absolute -inset-1 text-blue-500 opacity-30 blur-sm filter text-9xl md:text-10xl select-none pointer-events-none animate-pulse" aria-hidden="true">
//                 Tech Frontier
//               </div>
//             </h1>
            
//             {/* Animated subtitle */}
//             <p 
//               className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
//               style={{ 
//                 transform: `translateY(${isLoaded ? '0' : '30px'})`, 
//                 opacity: isLoaded ? 1 : 0, 
//                 transition: 'transform 1s ease-out 0.4s, opacity 1s ease-out 0.4s'
//               }}
//             >
//               Where innovation meets collaboration. Build the future with cutting-edge tech, expert mentorship, and a community of visionaries.
//             </p>
            
//             {/* Abstract divider */}
//             <div 
//               className="w-64 h-1 mx-auto relative overflow-hidden"
//               style={{ 
//                 transform: `translateY(${isLoaded ? '0' : '30px'})`, 
//                 opacity: isLoaded ? 1 : 0, 
//                 transition: 'transform 1s ease-out 0.5s, opacity 1s ease-out 0.5s'
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-gradient-x"></div>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-gradient-x" style={{ animationDelay: '0.5s' }}></div>
//             </div>
            
//             {/* Call to action buttons */}
//             <div 
//               className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
//               style={{ 
//                 transform: `translateY(${isLoaded ? '0' : '30px'})`, 
//                 opacity: isLoaded ? 1 : 0, 
//                 transition: 'transform 1.2s ease-out 0.6s, opacity 1.2s ease-out 0.6s'
//               }}
//             >
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-to-r from-violet-700 to-blue-700 hover:from-violet-600 hover:to-blue-600 text-white rounded-full px-10 py-7 text-lg font-medium relative overflow-hidden group"
//               >
//                 <span className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0)_25%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0)_75%)] bg-[length:250%_100%] animate-shine"></span>
//                 <span className="relative z-10 flex items-center gap-3">
//                   <Zap className="h-6 w-6" />
//                   Join The Revolution
//                 </span>
//               </Button>
              
//               <Button 
//                 size="lg" 
//                 variant="outline" 
//                 className="border-2 border-blue-600 text-blue-500 hover:bg-blue-900/20 rounded-full px-10 py-7 text-lg font-medium transition-all relative overflow-hidden group"
//               >
//                 <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-800/30 to-violet-800/30 group-hover:w-full transition-all duration-300"></span>
//                 <span className="relative z-10 flex items-center gap-3">
//                   <Star className="h-6 w-6" />
//                   Explore Projects
//                 </span>
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         {/* Futuristic scroll indicator */}
//         <div 
//           className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
//           style={{ 
//             opacity: isLoaded ? 1 : 0, 
//             transition: 'opacity 1.5s ease-out 1s'
//           }}
//         >
//           <div className="text-blue-500 animate-bounce text-sm font-light tracking-widest">SCROLL</div>
//           <div className="w-1 h-16 relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600 to-violet-600 animate-pulse"></div>
//             <div className="absolute top-0 left-0 w-full h-1/3 bg-white animate-[scanline_2s_infinite]"></div>
//           </div>
//         </div>
        
//         {/* Tech-inspired animated ring */}
//         <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-64 pointer-events-none opacity-20">
//           <div className="w-full h-full border-4 border-dashed border-blue-500 rounded-full animate-[spin_40s_linear_infinite]"></div>
//           <div className="absolute inset-4 border-4 border-dashed border-violet-500 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
//           <div className="absolute inset-8 border-4 border-dashed border-cyan-500 rounded-full animate-[spin_20s_linear_infinite]"></div>
//         </div>
//       </section>

//       {/* Features Section with Cyberpunk-inspired design */}
//       <section 
//         id="features" 
//         className="py-28 relative overflow-hidden"
//       >
//         {/* Ambient gradients */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black z-0"></div>
        
//         {/* Digital circuit pattern overlay */}
//         <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 z-0">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
//         </div>
        
//         {/* Content container */}
//         <div className="container px-4 md:px-6 mx-auto relative z-10">
//           {/* Section header with glassmorphism effect */}
//           <div className="flex flex-col items-center text-center mb-20 space-y-6 relative">
//             <Badge 
//               className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium border border-cyan-500/20 shadow-lg shadow-blue-700/20 overflow-hidden relative group"
//             >
//               <span className="flex items-center gap-2 relative z-10">
//                 <Brain className="h-4 w-4 text-cyan-400 animate-pulse" />
//                 <span className="text-white">Future-Ready Features</span>
//               </span>
//             </Badge>
            
//             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
//               <span className="relative inline-block">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 animate-gradient-x">Quantum</span>
//                 <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></span>
//               </span>{" "}
//               <span className="relative inline-block">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">Capabilities</span>
//                 <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></span>
//               </span>
//             </h2>
            
//             <div className="w-32 h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 mx-auto rounded-full animate-pulse"></div>
            
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               Unlock next-level skills with bleeding-edge tools and resources that redefine what's possible.
//             </p>
//           </div>
          
//           {/* Features grid with neo-brutalist cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//             {[
//               { 
//                 icon: Code, 
//                 title: "Neural Workshops", 
//                 desc: "AI-assisted coding labs that adapt to your skill level. Master any programming language with personalized guidance.",
//                 color: "cyan"
//               },
//               { 
//                 icon: RocketIcon, 
//                 title: "Innovation Lab", 
//                 desc: "Access state-of-the-art hardware, from quantum computers to AR/VR gear. Build prototypes beyond conventional limits.",
//                 color: "blue"
//               },
//               { 
//                 icon: Brain, 
//                 title: "AI Incubator", 
//                 desc: "Train your own models, access powerful APIs, and develop cutting-edge applications with expert mentorship.",
//                 color: "violet"
//               },
//               { 
//                 icon: NetworkIcon, 
//                 title: "Quantum Network", 
//                 desc: "Connect with industry leaders, venture capitalists, and fellow visionaries through our exclusive tech ecosystem.",
//                 color: "cyan"
//               },
//               { 
//                 icon: FlaskConical, 
//                 title: "Research Nexus", 
//                 desc: "Collaborate with academic institutions on breakthrough projects and publish your findings in scientific journals.",
//                 color: "blue"
//               },
//               { 
//                 icon: GlobeIcon, 
//                 title: "Global Interface", 
//                 desc: "Virtual workshops and hackathons connecting members worldwide. Collaborate across time zones on revolutionary projects.",
//                 color: "violet"
//               },
//             ].map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="group perspective-1000 h-full"
//                 style={{ 
//                   transform: `translateY(${scrollPosition > 300 ? '0' : '30px'})`, 
//                   opacity: scrollPosition > 300 ? 1 : 0, 
//                   transition: `transform 0.8s ease-out ${index * 0.1}s, opacity 0.8s ease-out ${index * 0.1}s`
//                 }}
//               >
//                 <div className="relative h-full bg-black backdrop-blur-lg border-2 border-gray-800 rounded-xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:border-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-900/20">
//                   {/* Futuristic scanline effect */}
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent"></div>
//                     <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scanline"></div>
//                   </div>
                  
//                   <div className="p-8 relative z-10 flex flex-col h-full">
//                     <div className={`h-16 w-16 rounded-xl bg-${feature.color}-900/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
//                       <feature.icon className={`h-8 w-8 text-${feature.color}-500`} />
//                     </div>
                    
//                     <h3 className={`text-2xl font-bold mb-4 text-white group-hover:text-${feature.color}-400 transition-colors`}>
//                       {feature.title}
//                     </h3>
                    
//                     <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6 flex-grow">
//                       {feature.desc}
//                     </p>
                    
//                     <div className="mt-auto flex justify-end">
//                       <Button 
//                         variant="ghost"
//                         size="sm"
//                         className={`text-${feature.color}-500 hover:text-${feature.color}-400 hover:bg-${feature.color}-900/20 transition-colors p-0`}
//                       >
//                         <span className="flex items-center gap-2">
//                           Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                         </span>
//                       </Button>
//                     </div>
                    
//                     {/* Bottom tech indicator */}
//                     <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-${feature.color}-500 to-transparent group-hover:w-full transition-all duration-1000 ease-out`}></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Events Section with Holographic Cards */}
//       <section 
//         id="events" 
//         className="py-28 relative overflow-hidden"
//       >
//         {/* Ambient background with digital rain effect */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black z-0"></div>
        
//         {/* Digital rain effect - ASCII characters flowing down */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           {[...Array(20)].map((_, i) => (
//             <div 
//               key={i}
//               className="absolute text-xs font-mono text-blue-500 whitespace-nowrap animate-digitalRain"
//               style={{
//                 left: `${i * 5}%`,
//                 top: '-20px',
//                 animationDuration: `${15 + Math.random() * 20}s`,
//                 animationDelay: `${Math.random() * 5}s`
//               }}
//             >
//               {[...Array(30)].map((_, j) => (
//                 <div 
//                   key={j}
//                   className="my-1 opacity-80"
//                   style={{ opacity: Math.random() * 0.7 + 0.3 }}
//                 >
//                   {Math.random() > 0.5 ? '1' : '0'}
//                   {Math.random() > 0.8 ? '{' : Math.random() > 0.7 ? '}' : Math.random() > 0.6 ? '[' : Math.random() > 0.5 ? ']' : Math.random() > 0.4 ? '<' : Math.random() > 0.3 ? '>' : '|'}
//                   {Math.random() > 0.5 ? '1' : '0'}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
        
//         {/* Content container */}
//         <div className="container px-4 md:px-6 mx-auto relative z-10">
//           {/* Section header */}
//           <div className="flex flex-col items-center text-center mb-20 space-y-6">
//             <Badge 
//               className="bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium border border-violet-500/20 shadow-lg shadow-fuchsia-700/20 overflow-hidden relative group"
//             >
//               <span className="flex items-center gap-2 relative z-10">
//                 <Layers className="h-4 w-4 text-fuchsia-400 animate-pulse" />
//                 <span className="text-white">Reality-Bending Events</span>
//               </span>
//             </Badge>
            
//             <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold "
//               style={{ 
//                 transform: `translateY(${scrollPosition > 800 ? '0' : '30px'})`, 
//                 opacity: scrollPosition > 800 ? 1 : 0, 
//                 transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
//               }}
//             >
//               <span className="relative inline-block">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-violet-600 to-fuchsia-500 animate-gradient-x">Hyper</span>
//                 <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-violet-600"></span>
//               </span>{" "}
//               <span className="relative inline-block">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 animate-gradient-x">Events</span>
//                 <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-fuchsia-500"></span>
//               </span>
//             </h2>
//             </div>
            
//             {/* Events grid with holographic cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">  
//               {[
//                 { 
//                   title: "Quantum Hackathon", 
//                   date: "Oct 15, 2025", 
//                   desc: "Join our annual hackathon to build quantum applications and compete for prizes. No experience required!",
//                   color: "fuchsia"
//                 },
//                 { 
//                   title: "AI Symposium", 
//                   date: "Nov 20, 2025", 
//                   desc: "Discover the latest trends in AI research and applications. Network with industry experts and researchers.",
//                   color: "violet"
//                 },
//                 { 
//                   title: "Tech Expo", 
//                   date: "Dec 5, 2025", 
//                   desc: "Explore cutting-edge tech demos, workshops, and projects. Get hands-on with the future of technology.",
//                   color: "fuchsia"
//                 },
//                 { 
//                   title: "Quantum Computing Workshop", 
//                   date: "Jan 10, 2026", 
//                   desc: "Learn the basics of quantum computing and build your first quantum application with expert guidance.",
//                   color: "violet"
//                 },
//                 { 
//                   title: "AR/VR Showcase", 
//                   date: "Feb 15, 2026", 
//                   desc: "Experience the latest AR/VR technologies and explore immersive worlds created by our members.",
//                   color: "fuchsia"
//                 },
//                 { 
//                   title: "Tech Career Fair", 
//                   date: "Mar 20, 2026", 
//                   desc: "Connect with top tech companies and startups. Explore internship and job opportunities in the tech industry.",
//                   color: "violet"
//                 },
//               ].map((event, index) => (
//                 <div 
//                   key={index} 
//                   className="group perspective-1000 h-full"
//                   style={{ 
//                     transform: `translateY(${scrollPosition > 1200 ? '0' : '30px'})`, 
//                     opacity: scrollPosition > 1200 ? 1 : 0, 
//                     transition: `transform 0.8s ease-out ${index * 0.1}s, opacity 0.8s ease-out ${index * 0.1}s`
//                   }}
//                 >
//                   <div className="relative h-full bg-black backdrop-blur-lg border-2 border-gray-800 rounded-xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:border-fuchsia
//                   -500/50 group-hover:shadow-xl group-hover:shadow-fuchsia-900/20">
//                     {/* Futuristic scanline effect */}
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                       <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 to-transparent"></div>
//                       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent animate-scanline"></div>
//                     </div>
                    
//                     <div className="p-8 relative z-10 flex flex-col h-full">
//                       <div className={`h-16 w-16 rounded-xl bg-${event.color}-900/20 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
//                         <CalendarIcon className={`h-8 w-8 text-${event.color}-500`} />
//                       </div>
                      
//                       <h3 className={`text-2xl font-bold mb-4 text-white group-hover:text-${event.color}-400 transition-colors`}>
//                         {event.title}
//                       </h3>
                      
//                       <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6 flex-grow">
//                         {event.desc}
//                       </p>
                      
//                       <div className="mt-auto flex justify-end">
//                         <Button 
//                           variant="ghost"
//                           size="sm"
//                           className={`text-${event.color}-500 hover:text-${event.color}-400 hover:bg-${event.color}-900/20 transition-colors p-0`}
//                         >
//                           <span className="flex items-center gap-2">
//                             Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                           </span>
//                         </Button>
//                       </div>
                      
//                       {/* Bottom tech indicator */}
//                       <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-${event.color}-500 to-transparent group-hover:w-full transition-all duration-1000 ease-out`}></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeIcon, CalendarIcon, Users2Icon, LightbulbIcon, RocketIcon, 
         TrendingUpIcon, Zap, Star, Laptop, ArrowRight, Code, 
         Sparkles} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ["hero", "features", "events"];
      const sectionElements = sections.map(s => document.getElementById(s));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = (intensity) => {
    return {
      transform: `translate(${mousePosition.x / 100 * intensity}px, ${mousePosition.y / 100 * intensity}px)`
    };
  };

  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black">
      {/* Hero Section */}
      <section id="hero" className="min-h-[93vh] flex items-center justify-center relative overflow-hidden">
        {/* Interactive background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} 
              className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/50 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Parallax glow effects */}
        <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/30 dark:bg-primary/20 blur-3xl rounded-full"
          style={parallaxOffset(-0.5)}></div>
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-accent/30 dark:bg-accent/20 blur-3xl rounded-full"
          style={parallaxOffset(0.5)}></div>
        
        {/* 3D floating elements */}
        <div className="absolute right-20 top-40 w-64 h-64 opacity-20 dark:opacity-30" style={parallaxOffset(2)}>
          <div className="w-full h-full border-4 border-primary/50 rounded-xl transform rotate-12 animate-float"></div>
        </div>
        <div className="absolute left-20 bottom-40 w-48 h-48 opacity-20 dark:opacity-30" style={parallaxOffset(1.5)}>
          <div className="w-full h-full border-4 border-accent/50 rounded-full transform -rotate-12 animate-float"></div>
        </div>
        
        {/* Hero content */}
        <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
          <div className="space-y-8 max-w-3xl">
            <div className="flex justify-center">
              <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20" 
                variant="outline">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">
                    College Tech Club 2025
                  </span>
                </span>
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground dark:text-foreground-dark leading-tight">
              <span className="relative">
                Innovate
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"> Create</span> 
              <br />
              <span className="relative">
                Collaborate
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
              </span>
            </h1>
            
            {/* Animated glowing line */}
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>
            
            <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[700px] mx-auto leading-relaxed">
              Join our community of tech enthusiasts to build cutting-edge projects, master new technologies, and shape the future of innovation together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  Join the Club
                </span>
                <span className="absolute -bottom-0 left-0 w-full h-1 bg-white/30"></span>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-accent text-accent hover:bg-accent/10 rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-accent/10 group-hover:w-full transition-all duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Explore Projects
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Interactive scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary dark:border-accent flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-primary dark:bg-accent rounded-full animate-[pulse_1.5s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Tech-inspired Elements */}
<section id="features" className="py-5 relative overflow-hidden">
  {/* Tech-inspired background with animated gradients */}
  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background to-background/90 dark:from-background-dark/80 dark:via-background-dark dark:to-background-dark/90 z-0"></div>
  
  {/* Animated grid continuation from hero */}
  <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:to-background-dark"></div>
  </div>
  
  {/* Animated particles */}
  <div className="absolute inset-0 z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} 
        className="absolute w-2 h-2 rounded-full bg-accent/30 dark:bg-accent/50 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${10 + Math.random() * 15}s`
        }}
      ></div>
    ))}
  </div>
  
  {/* Parallax glow effects */}
  <div className="absolute left-20 top-40 w-80 h-80 bg-accent/20 dark:bg-accent/10 blur-3xl rounded-full opacity-70"
    style={{transform: `translateY(calc(var(--scroll) * -0.05))`}}></div>
  <div className="absolute right-10 bottom-60 w-96 h-96 bg-primary/20 dark:bg-primary/10 blur-3xl rounded-full opacity-60"
    style={{transform: `translateY(calc(var(--scroll) * 0.08))`}}></div>
  
  {/* Content container */}
  <div className="container px-4 md:px-6 mx-auto relative z-10">
    {/* Section header */}
    <div className="flex flex-col items-center text-center mb-16 space-y-6">
      <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20" 
        variant="outline">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
          <span className="text-foreground dark:text-foreground-dark">Exclusive Features</span>
        </span>
      </Badge>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground dark:text-foreground-dark">
        <span className="relative">
          Learn.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"> Build.</span> 
        <span className="relative">
          Grow.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
        </span>
      </h2>
      
      {/* Animated glowing line */}
      <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>
      
      <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[800px] mx-auto leading-relaxed">
        A playground for students to master tech, collaborate, and launch their careers with cutting-edge resources.
      </p>
    </div>
    
    {/* Features grid with interactive cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[
        { 
          icon: Code, 
          title: "Code Labs", 
          desc: "Hands-on coding with mentors to level up fast. Access weekly workshops and gain practical skills.",
          color: "primary"
        },
        { 
          icon: RocketIcon, 
          title: "Project Forge", 
          desc: "Build real projects, from idea to demo. Get feedback from industry experts and build your portfolio.",
          color: "accent"
        },
        { 
          icon: CalendarIcon, 
          title: "Tech Jams", 
          desc: "Hackathons & talks to spark inspiration. Collaborate with peers and win prizes with innovative solutions.",
          color: "secondary"
        },
        { 
          icon: LightbulbIcon, 
          title: "Skill Vault", 
          desc: "Free resources to master any tech stack. Access tutorials, courses, and documentation handpicked by pros.",
          color: "primary"
        },
        { 
          icon: Users2Icon, 
          title: "Peer Circuit", 
          desc: "Connect with students and pros alike. Build your network and find mentors in your field of interest.",
          color: "accent"
        },
        { 
          icon: TrendingUpIcon, 
          title: "Career Boost", 
          desc: "Internships and advice to launch your career. Get resume reviews and interview prep from industry insiders.",
          color: "secondary"
        },
      ].map((feature, index) => (
        <div key={index} className="group relative perspective-1000">
          <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/5 dark:group-hover:shadow-accent/5">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/10 to-transparent`}></div>
            </div>
            
            {/* Top border glow */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${feature.color} via-${feature.color}/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="p-6 relative z-10">
              <div className={`h-12 w-12 rounded-lg bg-${feature.color}/10 dark:bg-${feature.color}/20 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}`} />
              </div>
              
              <h3 className={`text-xl font-bold mb-2 text-foreground dark:text-foreground-dark group-hover:text-${feature.color} transition-colors`}>
                {feature.title}
              </h3>
              
              <p className="text-muted dark:text-muted-dark">
                {feature.desc}
              </p>
            </div>
            
            {/* Bottom progress bar that fills on hover */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${feature.color} group-hover:w-full transition-all duration-700 ease-out`}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Events Section with Futuristic Elements */}
<section id="events" className="py-5 relative overflow-hidden">
  {/* Tech-inspired background with dark gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90 z-0"></div>
  
  {/* Circuit pattern overlay */}
  <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
    <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
  </div>
  
  {/* Floating orbs with different opacities */}
  <div className="absolute inset-0 z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} 
        className="absolute w-2 h-2 rounded-full bg-secondary/30 dark:bg-secondary/50 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${10 + Math.random() * 15}s`
        }}
      ></div>
    ))}
  </div>
  
  {/* Content container */}
  <div className="container px-4 md:px-6 mx-auto relative z-10">
    {/* Section header */}
    <div className="flex flex-col items-center text-center mb-16 space-y-6">
      <Badge className="bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-secondary/10 dark:shadow-primary/10 border border-secondary/20 dark:border-primary/20" 
        variant="outline">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-secondary dark:text-secondary animate-pulse" />
          <span className="text-foreground dark:text-foreground-dark">Upcoming Tech Events</span>
        </span>
      </Badge>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground dark:text-foreground-dark">
        <span className="relative">
          Hack.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent"></span>
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent animate-gradient-x"> Learn.</span> 
        <span className="relative">
          Connect.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
        </span>
      </h2>
      
      {/* Animated glowing line */}
      <div className="w-32 h-1 bg-gradient-to-r from-secondary via-primary to-accent mx-auto rounded-full animate-pulse"></div>
      
      <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[800px] mx-auto leading-relaxed">
        Join the action—events designed for students to shine and expand their technical horizons.
      </p>
    </div>
    
    {/* Events cards with hover effects */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[
        {
          type: "Workshop",
          title: "NextJS Bootcamp",
          date: "March 20, 2025 • 3:00 PM",
          desc: "Master modern web development with professional mentors guiding you through building a complete application.",
          color: "primary",
          icon: CodeIcon,
        },
        {
          type: "Hackathon",
          title: "48-Hour Tech Blitz",
          date: "April 5-7, 2025 • Tech Building",
          desc: "Team up, hack, and win big with $5000 in prizes! Create solutions for real-world problems in this intense challenge.",
          color: "accent",
          icon: RocketIcon,
        },
        {
          type: "Tech Talk",
          title: "AI Future Lab",
          date: "April 15, 2025 • 5:00 PM",
          desc: "Learn about cutting-edge AI from industry experts, with hands-on demos and networking opportunities after the talk.",
          color: "secondary",
          icon: LightbulbIcon,
        },
      ].map((event, index) => (
        <div key={index} className="group relative perspective-1000">
          <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-secondary/10 dark:border-accent/5 rounded-xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-secondary/5 dark:group-hover:shadow-accent/5 h-full flex flex-col">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br from-${event.color}/10 to-transparent`}></div>
            </div>
            
            {/* Top border glow */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${event.color} via-${event.color}/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="p-6 relative z-10 flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={`bg-${event.color}/10 dark:bg-${event.color}/20 text-${event.color} px-3 py-1 rounded-full text-sm font-medium`}>
                  <span className="flex items-center gap-2">
                    <event.icon className="h-3 w-3" />
                    {event.type}
                  </span>
                </Badge>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 text-foreground dark:text-foreground-dark group-hover:text-${event.color} transition-colors`}>
                {event.title}
              </h3>
              
              <div className="flex items-center text-muted dark:text-muted-dark mb-4 text-sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {event.date}
              </div>
              
              <p className="text-muted dark:text-muted-dark mb-6">
                {event.desc}
              </p>
            </div>
            
            <div className="p-6 pt-0 relative z-10 mt-auto">
              <Button className={`w-full bg-${event.color}/10 hover:bg-${event.color}/20 text-${event.color} border border-${event.color}/30 rounded-lg relative overflow-hidden group`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Now
                  <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
            
            {/* Bottom progress bar that fills on hover */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${event.color} group-hover:w-full transition-all duration-700 ease-out`}></div>
          </div>
        </div>
      ))}
    </div>
    </div>
</section>

      {/* Floating navigation indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {[
            { id: "hero", label: "Home", icon: Laptop },
            { id: "features", label: "Features", icon: Code },
            // { id: "events", label: "Events", icon: Calendar }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`w-3 h-12 rounded-full flex items-center justify-center group transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-primary/20 dark:bg-accent/20" 
                  : "bg-background/50 dark:bg-background-dark/50"
              }`}
            >
              <div className="relative">
                <span className={`absolute -left-16 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs px-2 py-1 rounded whitespace-nowrap`}>
                  {item.label}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  activeSection === item.id 
                    ? "bg-primary dark:bg-accent" 
                    : "bg-foreground/30 dark:bg-foreground-dark/30"
                }`}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
