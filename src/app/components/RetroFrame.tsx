import bkgImage from '../../images/bkg.png';

export default function RetroFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        {/* 8-bit style outer border - wooden */}
        <div className="relative bg-amber-800 p-2">
          {/* Inner darker wood border */}
          <div className="relative bg-amber-950 p-2">
            {/* Corner decorations - 8-bit style */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-amber-700"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-amber-700"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-amber-700"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-amber-700"></div>
            
            {/* Corner inner pixels */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-amber-950"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-amber-950"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 bg-amber-950"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-amber-950"></div>
            
            {/* Light wood accent border */}
            <div className="relative bg-amber-600 p-1">
              {/* Content area with background image and overlay */}
              <div className="relative min-h-[600px] overflow-visible bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bkgImage})` }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}