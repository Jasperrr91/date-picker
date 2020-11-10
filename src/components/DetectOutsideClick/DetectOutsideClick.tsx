import React, { useRef, useEffect } from 'react';

type Props = {
  handleClick: () => void;
  children: React.ReactNode;
};

const useOutsideClick = (handleClick: any, ref: any) => {
  useEffect(() => {
    const outsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick();
      }
    };

    document.addEventListener('click', outsideClick);

    return () => {
      document.removeEventListener('click', outsideClick);
    };
  }, [handleClick, ref]);
};

const DetectOutsideClick = ({ handleClick, children }: Props) => {
  const wrapperRef = useRef(null);
  useOutsideClick(handleClick, wrapperRef);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default DetectOutsideClick;
