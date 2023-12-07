import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BodyModal from './bodymodal';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  name: string;
}

const ModalC: React.FC<ModalProps> = ({ show, onClose, name }) => {
  if (!show) {
    return null;
  }


  return (
    <div>

      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl relative h-auto min-h-full max-h-full">
        <div>
          <button className="absolute top-2 right-5 bg-transparent cursor-pointer border-none w-8"
            onClick={onClose}>
            <HighlightOffIcon sx={{ color: 'red', fontSize: 40 }} />
          </button>
        </div>

        <div>
          <BodyModal nameP={name}/>
        </div>

      </div>
    </div>

    
  );
};

export default ModalC;
