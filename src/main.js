// Email validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Weather icons SVG
const weatherIcons = {
  clear: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
    <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.49 20.49L19.07 19.07M4.93 4.93L3.51 3.51M20.49 3.51L19.07 4.93M4.93 19.07L3.51 20.49" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  clouds: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H17C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10H6C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  rain: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H17C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10H6C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" stroke="currentColor" stroke-width="2"/>
    <path d="M8 19V21M12 19V21M16 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  thunderstorm: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H17C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10H6C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" stroke="currentColor" stroke-width="2"/>
    <path d="M13 13L10 17H12L11 21L15 16H13L13 13Z" fill="currentColor"/>
  </svg>`,
  snow: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10H17C17 7.23858 14.7614 5 12 5C9.23858 5 7 7.23858 7 10H6C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" stroke="currentColor" stroke-width="2"/>
    <path d="M8 19L8 21M12 19L12 21M16 19L16 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="8" cy="20" r="0.5" fill="currentColor"/>
    <circle cx="12" cy="20" r="0.5" fill="currentColor"/>
    <circle cx="16" cy="20" r="0.5" fill="currentColor"/>
  </svg>`,
  mist: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H21M3 12H21M3 16H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

// Update time display
const updateTime = () => {
  const now = new Date();
  
  // Format time as HH:MM:SSAM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  const hoursStr = hours.toString().padStart(2, '0');
  
  const timeString = `${hoursStr}:${minutes}:${seconds}${ampm}`;
  
  // Format date
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  
  const timeElement = document.getElementById('currentTime');
  const dateElement = document.getElementById('currentDate');
  
  if (timeElement) timeElement.textContent = timeString;
  if (dateElement) dateElement.textContent = dateString;
};

// Fetch weather data for Tagum City
const updateWeather = async () => {
  try {
    // Using Open-Meteo API (free, no API key required)
    // Tagum City coordinates: approximately 7.45°N, 125.81°E
    const lat = 7.45;
    const lon = 125.81;
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia/Manila`
    );
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    const weatherCode = data.current.weather_code;
    
    // Map weather codes to icons
    let iconKey = 'clear';
    if (weatherCode === 0) iconKey = 'clear';
    else if (weatherCode >= 1 && weatherCode <= 3) iconKey = 'clouds';
    else if (weatherCode >= 51 && weatherCode <= 67) iconKey = 'rain';
    else if (weatherCode >= 80 && weatherCode <= 99) iconKey = 'thunderstorm';
    else if (weatherCode >= 71 && weatherCode <= 77) iconKey = 'snow';
    else if (weatherCode >= 45 && weatherCode <= 48) iconKey = 'mist';
    
    // Update UI
    const tempElement = document.getElementById('temperature');
    const iconElement = document.getElementById('weatherIcon');
    
    if (tempElement) tempElement.textContent = `${temp}°C`;
    if (iconElement) iconElement.innerHTML = weatherIcons[iconKey];
    
  } catch (error) {
    console.error('Weather update failed:', error);
    // Fallback to default values
    const tempElement = document.getElementById('temperature');
    if (tempElement) tempElement.textContent = '28°C';
  }
};

// Form submission handler
const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();
  
  if (!validateEmail(email)) {
    // Add shake animation for invalid email
    emailInput.classList.add('shake');
    setTimeout(() => emailInput.classList.remove('shake'), 500);
    return;
  }
  
  // Store email (in a real app, this would send to a backend)
  console.log('Email submitted:', email);
  
  // Show success modal
  const modal = document.getElementById('successModal');
  modal.classList.add('active');
  
  // Clear form
  emailInput.value = '';
  
  // Store in localStorage for demo purposes
  try {
    const emails = JSON.parse(localStorage.getItem('bettertagum_emails') || '[]');
    if (!emails.includes(email)) {
      emails.push(email);
      localStorage.setItem('bettertagum_emails', JSON.stringify(emails));
    }
  } catch (error) {
    console.error('Storage error:', error);
  }
};

// Modal close handler
const handleModalClose = () => {
  const modal = document.getElementById('successModal');
  modal.classList.remove('active');
};

// Initialize event listeners
const init = () => {
  const form = document.getElementById('notifyForm');
  const modalClose = document.getElementById('modalClose');
  const modal = document.getElementById('successModal');
  
  // Initialize time and weather
  updateTime();
  updateWeather();
  
  // Update time every second
  setInterval(updateTime, 1000);
  
  // Update weather every 10 minutes
  setInterval(updateWeather, 600000);
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', handleModalClose);
  }
  
  // Close modal on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        handleModalClose();
      }
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  });
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add intersection observer for scroll animations (optional enhancement)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe elements (if needed for future enhancements)
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });
  }
  
  // Add console welcome message
  console.log('%cBetterTagum.gov', 'font-size: 24px; font-weight: bold; color: #0052CC;');
  console.log('%cBuilding a better future for Tagum City', 'font-size: 14px; color: #1E3A8A;');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Add shake animation style dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .shake {
    animation: shake 0.3s ease-in-out;
    border-color: #EF4444 !important;
  }
`;
document.head.appendChild(style);

// Export for potential module usage
export { validateEmail, handleFormSubmit, handleModalClose };
