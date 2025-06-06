import React, { useEffect, useState } from 'react';

export const FloatingDepartmentIcon = ({ color, department, size, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1
  });

  useEffect(() => {
    const updatePosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = size;
      
      // Calculate new position
      let newX = position.x + direction.x;
      let newY = position.y + direction.y;
      
      // Check boundaries and change direction if needed
      let newDirectionX = direction.x;
      let newDirectionY = direction.y;
      
      if (newX <= padding || newX >= viewportWidth - padding) {
        newDirectionX = -direction.x;
        newX = newX <= padding ? padding : viewportWidth - padding;
      }
      
      if (newY <= padding || newY >= viewportHeight - padding) {
        newDirectionY = -direction.y;
        newY = newY <= padding ? padding : viewportHeight - padding;
      }
      
      // Occasionally change direction slightly for more natural movement
      if (Math.random() < 0.05) {
        newDirectionX += (Math.random() * 0.2 - 0.1);
        newDirectionY += (Math.random() * 0.2 - 0.1);
        
        // Normalize direction vector to keep consistent speed
        const magnitude = Math.sqrt(newDirectionX * newDirectionX + newDirectionY * newDirectionY);
        newDirectionX = newDirectionX / magnitude;
        newDirectionY = newDirectionY / magnitude;
      }
      
      setPosition({ x: newX, y: newY });
      setDirection({ x: newDirectionX, y: newDirectionY });
    };
    
    const interval = setInterval(updatePosition, 20);
    return () => clearInterval(interval);
  }, [position, direction, size]);

  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'text-primary dark:text-primary-dark';
      case 'secondary': return 'text-secondary dark:text-secondary-dark';
      case 'accent': return 'text-accent dark:text-accent-dark';
      default: return 'text-primary dark:text-primary-dark';
    }
  };
  
  const getDepartmentSvg = () => {
    switch (department) {
      case 'development':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced Development/Computer Engineering Icon */}
            <rect x="15" y="25" width="70" height="50" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
            <rect x="15" y="25" width="70" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            <circle cx="21" cy="31" r="2" fill="currentColor" />
            <circle cx="27" cy="31" r="2" fill="currentColor" />
            <circle cx="33" cy="31" r="2" fill="currentColor" />
            
            {/* Code elements */}
            <path d="M25,45 L15,55 L25,65" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M75,45 L85,55 L75,65" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path d="M60,42 L40,68" stroke="currentColor" strokeWidth="2.5" fill="none" />
            
            {/* Circuit board tracks */}
            <path d="M30,50 H50 M30,60 H70" stroke="currentColor" strokeWidth="1" strokeDasharray="1 2" />
            <circle cx="30" cy="50" r="1.5" fill="currentColor" />
            <circle cx="50" cy="50" r="1.5" fill="currentColor" />
            <circle cx="30" cy="60" r="1.5" fill="currentColor" />
            <circle cx="70" cy="60" r="1.5" fill="currentColor" />
            
            {/* Base/Stand */}
            <rect x="20" y="80" width="60" height="5" rx="2" fill="currentColor" fillOpacity="0.3" />
            <path d="M40,75 V80 M60,75 V80" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'cybersecurity':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced Cybersecurity Icon */}
            <path d="M50,15 C35,25 20,25 20,25 V55 C20,75 50,85 50,85 C50,85 80,75 80,55 V25 C80,25 65,25 50,15 Z" 
              stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
            
            {/* Lock body */}
            <rect x="35" y="40" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            
            {/* Lock mechanism and details */}
            <path d="M35,50 H65" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="55" r="5" fill="currentColor" />
            <rect x="48" y="55" width="4" height="10" rx="1" fill="currentColor" />
            
            {/* Digital/Circuit Elements */}
            <path d="M30,30 H40 M60,30 H70" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            <path d="M25,35 H45 M55,35 H75" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            <circle cx="40" cy="30" r="1.5" fill="currentColor" />
            <circle cx="60" cy="30" r="1.5" fill="currentColor" />
            <circle cx="45" cy="35" r="1.5" fill="currentColor" />
            <circle cx="55" cy="35" r="1.5" fill="currentColor" />
            
            {/* Binary data visualization */}
            <text x="37" y="47" fill="currentColor" fontSize="4" fontFamily="monospace">10110</text>
            <text x="45" y="47" fill="currentColor" fontSize="4" fontFamily="monospace">01001</text>
            
            {/* Shield outline glow effect */}
            <path d="M50,20 C38,28 25,28 25,28 V53 C25,68 50,78 50,78 C50,78 75,68 75,53 V28 C75,28 62,28 50,20 Z" 
              stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
          </svg>
        );
      case 'ai':
        return (
<svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced AI/Data Science Icon */}
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
            
            {/* Brain structure */}
            <path d="M30,30 Q50,15 70,30" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M25,45 Q35,55 45,43" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M55,43 Q65,55 75,45" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M30,70 Q50,85 70,70" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Neural network nodes with pulsing effect */}
            <circle cx="30" cy="30" r="4" fill="currentColor" fillOpacity="0.8">
              <animate attributeName="r" values="3.5;4.5;3.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="70" cy="30" r="4" fill="currentColor" fillOpacity="0.8">
              <animate attributeName="r" values="4;5;4" dur="2.7s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="45" r="3" fill="currentColor" fillOpacity="0.7">
              <animate attributeName="r" values="2.5;3.5;2.5" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="45" r="3" fill="currentColor" fillOpacity="0.7">
              <animate attributeName="r" values="2.8;3.8;2.8" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.9">
              <animate attributeName="r" values="4.5;5.5;4.5" dur="2s" repeatCount="indefinite" />
            </circle>
            
            {/* Data visualization elements */}
            <path d="M35,60 H45 L55,50 L65,55" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="1 0" />
            <circle cx="35" cy="60" r="1.5" fill="currentColor" />
            <circle cx="45" cy="60" r="1.5" fill="currentColor" />
            <circle cx="55" cy="50" r="1.5" fill="currentColor" />
            <circle cx="65" cy="55" r="1.5" fill="currentColor" />
            
            {/* Neural connections with pulse animation */}
            <path d="M30,30 L50,50 L70,30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6">
              <animate attributeName="stroke-opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M25,45 L50,50 L75,45" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6">
              <animate attributeName="stroke-opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
            </path>
            <path d="M30,70 L50,50 L70,70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6">
              <animate attributeName="stroke-opacity" values="0.4;0.7;0.4" dur="2.8s" repeatCount="indefinite" />
            </path>
          </svg>
        );
      case 'gamedev':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Game Dev Icon - 3D game environment */}
            <path d="M20,30 L50,15 L80,30 L50,45 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
            <path d="M20,30 L20,70 L50,85 L80,70 L80,30" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50,45 L50,85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M20,70 L50,55 L80,70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Game character */}
            <circle cx="35" cy="60" r="5" fill="currentColor" fillOpacity="0.7" />
            <path d="M32,57 L38,57" stroke="currentColor" strokeWidth="1.5" />
            <path d="M35,65 L35,72" stroke="currentColor" strokeWidth="1" />
            <path d="M31,72 L39,72" stroke="currentColor" strokeWidth="1" />

            {/* Control elements */}
            <circle cx="65" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="60" cy="40" r="2" fill="currentColor" />
            <circle cx="70" cy="40" r="2" fill="currentColor" />
            <circle cx="65" cy="35" r="2" fill="currentColor" />
            <circle cx="65" cy="45" r="2" fill="currentColor" />
          </svg>
        );
      case 'design':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced Design/Game Dev Icon */}
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
            
            {/* Color palette */}
            <path d="M25,35 A30,30 0 1,1 75,65" stroke="currentColor" strokeWidth="2" fill="none" />
            
            {/* Game controller elements */}
            <rect x="30" y="45" width="40" height="25" rx="12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="40" cy="55" r="3" fill="currentColor" />
            <circle cx="60" cy="55" r="3" fill="currentColor" />
            <rect x="45" y="65" width="10" height="2" rx="1" fill="currentColor" />
            <path d="M37,65 H43 M57,65 H63" stroke="currentColor" strokeWidth="1.5" />
            
            {/* 3D elements */}
            <path d="M20,20 L30,15 L40,20 L30,25 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
            <path d="M20,20 V30 L30,35 L40,30 V20" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M30,25 V35" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
            
            {/* Color swatches */}
            <circle cx="25" cy="35" r="5" fill="currentColor" fillOpacity="0.7" />
            <circle cx="35" cy="25" r="4" fill="currentColor" fillOpacity="0.5" />
            <circle cx="65" cy="25" r="6" fill="currentColor" fillOpacity="0.3" />
            <circle cx="75" cy="45" r="5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="65" cy="65" r="4" fill="currentColor" fillOpacity="0.6" />
            
            {/* Design tools */}
            <path d="M72,25 L80,17" stroke="currentColor" strokeWidth="1" />
            <circle cx="82" cy="15" r="3" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
            <path d="M15,75 L25,65" stroke="currentColor" strokeWidth="1" />
            <rect x="12" y="75" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          </svg>
        );
      case 'iot':
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Enhanced IoT Icon */}
            {/* Central hub */}
            <rect x="40" y="40" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="50" r="7" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 1">
              <animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" />
            </circle>
            
            {/* Connected devices */}
            <rect x="15" y="25" width="15" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
            <rect x="15" y="55" width="15" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
            <rect x="70" y="25" width="15" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
            <rect x="70" y="55" width="15" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
            
            {/* Device screens and details */}
            <rect x="17" y="28" width="11" height="6" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <rect x="17" y="58" width="11" height="10" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <rect x="72" y="28" width="11" height="6" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <rect x="72" y="58" width="11" height="10" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            
            {/* Connection lines with animation */}
            <path d="M30,35 L40,45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2">
              <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M30,65 L40,55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2">
              <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="2.3s" repeatCount="indefinite" />
            </path>
            <path d="M70,45 L60,35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2">
              <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="1.7s" repeatCount="indefinite" />
            </path>
            <path d="M70,55 L60,65" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2">
              <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="2.2s" repeatCount="indefinite" />
            </path>
            
            {/* Device indicators */}
            <circle cx="22.5" cy="38" r="2" fill="currentColor">
              <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="22.5" cy="65" r="2" fill="currentColor">
              <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="77.5" cy="38" r="2" fill="currentColor">
              <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="77.5" cy="65" r="2" fill="currentColor">
              <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="1.3s" repeatCount="indefinite" />
            </circle>
            
            {/* WiFi/Signal indicators */}
            <path d="M22.5,35 Q22.5,40 25,40" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M77.5,35 Q77.5,40 75,40" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M50,35 Q50,30 55,25" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M50,35 Q50,30 45,25" stroke="currentColor" strokeWidth="1" fill="none" />
            
            {/* Cloud computing element */}
            <path d="M40,15 Q35,15 35,20 Q30,20 30,25 Q30,30 35,30 H45 Q50,30 50,25 Q50,20 45,20 Q45,15 40,15" 
              stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
            <path d="M37,25 H43 M40,22 V28" stroke="currentColor" strokeWidth="0.75" />
            </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`shape ${getColorClass()} glow absolute pointer-events-none z-10`}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'all 0.3s ease-out'
      }}
    >
      {getDepartmentSvg()}
    </div>
  );
};