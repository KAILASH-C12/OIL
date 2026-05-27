import React, { useEffect } from 'react';

const NoupeChatbot = () => {
  useEffect(() => {
    const scriptSrc = 'https://www.noupe.com/embed/019e67eaa42176dd822995748b94b37b3ae7.js';
    
    // Check if the script is already loaded to avoid duplicate script loading
    let script = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // The chatbot widget loads and mounts itself to the body
};

export default NoupeChatbot;
