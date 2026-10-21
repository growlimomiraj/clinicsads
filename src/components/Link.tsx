import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  target,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow standard behavior for middle-clicks, cmd/ctrl clicks, or external targets
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      target === '_blank' ||
      !href.startsWith('/')
    ) {
      return;
    }

    e.preventDefault();

    if (window.location.pathname !== href) {
      window.history.pushState(null, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a href={href} className={className} onClick={handleClick} target={target} {...rest}>
      {children}
    </a>
  );
};
