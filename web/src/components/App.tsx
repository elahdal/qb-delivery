import React, { useContext } from "react";
import { debugData } from "../utils/debugData";

import DeliveryStatsData from "./DeliveryStats";
import Options from "./Options";
import PlayersLobby from "./PlayersLobby";
import { OptionsContext, OptionsProvider } from "./Optioncontext";

import "./App.css";
import "./Options.css";
import "./DeliveryStats";
import "./deliveryStats.css";
import "./Options";
import "./PlayersLobby";
import "./playersLobby.css";


// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);


const InnerApp: React.FC = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("OptionsContext non trouvé");
  }
  const { isPressed, isPressed2, isPressed3 } = context;

  return (
    <div className="rootframe" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Options/>
      <PlayersLobby/>
      <DeliveryStatsData/>
      <div className="test"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <OptionsProvider>
      <InnerApp/>
    </OptionsProvider>
  );
};

export default App;
