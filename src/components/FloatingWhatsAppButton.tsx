import { MessageCircle } from "lucide-react";

export const FloatingWhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+14072867954";
    const message = "Olá! Tenho uma dúvida sobre o cadastro.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-whatsapp text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium text-sm whitespace-nowrap group-hover:opacity-90">
          Dúvidas?
        </span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Falar no WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};
