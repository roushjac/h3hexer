import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import FileUploader from './FileUploader';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';


const createFileUploaderControl = (FileUploaderComponent: React.FC) => {
  return L.Control.extend({
    onAdd: function() {
      const div = L.DomUtil.create('div', '');
      const root = createRoot(div)
      root.render(<FileUploaderComponent />)
      return div;
    },
  });
};

const FileUploaderControl: React.FC = () => {
  const map = useMap();
  let uploader: any = null;

  useEffect(() => {
    const FileUploaderLeafletControl = createFileUploaderControl(FileUploader);
    uploader = new FileUploaderLeafletControl();
    uploader.addTo(map);

    // Cleanup function to remove the control when component unmounts
    return () => {
      if (uploader && map) {
        map.removeControl(uploader);
      }
    };
  }, [map]);

  return null;
};

export default FileUploaderControl;
