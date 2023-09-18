import { MapContainer, TileLayer} from "react-leaflet";
import ControlsContainer from "./components/ControlsContainer";
import FileUploaderControl from "./components/FileUploaderControl";

const App = () => {
  return (
    <MapContainer
      center={[38.505, -95.09]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ControlsContainer>
        <FileUploaderControl />
      </ControlsContainer>
    </MapContainer>
  );
};

export default App;