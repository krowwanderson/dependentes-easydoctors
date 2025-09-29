export const EasyDoctorsHeader = () => {
  return (
    <header className="bg-white border-b border-easy-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          {/* Logo Centralizado */}
          <a href="https://easydoctors.us/" className="block">
            <img 
              src="/easydoctors-logo.png" 
              alt="Easy Doctors" 
              className="w-[120px] h-auto"
              fetchPriority="high"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
