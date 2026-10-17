import React, { useState } from 'react';
import { User } from 'lucide-react';
import { PhotoAssetInfo } from '../data/siteContent';

interface ResilientPortraitProps {
  asset: PhotoAssetInfo;
  className?: string;
  imgClassName?: string;
  fallbackBg?: string;
}

export const ResilientPortrait: React.FC<ResilientPortraitProps> = ({
  asset,
  className = '',
  imgClassName = '',
  fallbackBg = 'bg-[#DFECC8]',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${fallbackBg} ${className}`}>
      {!hasError ? (
        <img
          src={asset.src}
          alt={asset.alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={`w-full h-full ${asset.cropStyle} ${imgClassName}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#DFECC8] to-[#C7DCA5] text-[#183B2B]"
          role="img"
          aria-label={asset.alt}
        >
          <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center mb-2 shadow-sm">
            <User className="w-6 h-6 text-[#183B2B]" />
          </div>
          <span className="text-xs font-medium text-[#183B2B]/80 max-w-[140px] leading-tight">
            {asset.label}
          </span>
        </div>
      )}
    </div>
  );
};
