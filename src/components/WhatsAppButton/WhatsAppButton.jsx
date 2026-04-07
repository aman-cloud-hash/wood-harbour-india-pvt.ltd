import { FiMessageCircle } from 'react-icons/fi';

const WHATSAPP_NUMBER = '7676503429';

export default function WhatsAppButton() {
  const handleClick = () => {
    const text = encodeURIComponent('Hello Woodharbour India Team, I am interested in your furniture products.');
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="whatsapp-btn"
      id="whatsapp-floating-btn"
      aria-label="Contact us on WhatsApp"
    >
      <FiMessageCircle />
      <span>Chat with Us</span>
    </button>
  );
}
