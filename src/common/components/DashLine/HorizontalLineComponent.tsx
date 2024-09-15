import React from 'react';
import './HorizontalLineComponent.css';
type HorizontalLineComponentProps = {
  dashSize?: string;
  color1?: string;
  color2?: string;
  width?: string;
  spaceSize?: string;
  className?: string;
};
function HorizontalLineComponent({
  dashSize = '40px',
  color1 = 'red',
  color2 = 'blue',
  width = '1px',
  spaceSize = dashSize,
  className,
}: HorizontalLineComponentProps) {
  const style: React.CSSProperties = {
    '--dash-size': dashSize,
    '--color1': color1,
    '--color2': color2,
    '--width-line': width,
    '--space-size': spaceSize,
  } as React.CSSProperties;
  return (
    <hr className={`horizontal-dash-line ${className}`} style={style}></hr>
  );
}

export default HorizontalLineComponent;
