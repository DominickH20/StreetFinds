import React from 'react';
import './TempContainer.css';

interface tempProps {
  text: string;
}

const TempContainer: React.FC<tempProps> = (props) => {
  return (
    <div className="temp-container">
      <strong>{props.text}</strong>
    </div>
  );
};

export default TempContainer;
