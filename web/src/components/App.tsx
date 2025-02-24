import React from "react";
import { debugData } from "../utils/debugData";

import DeliveryStatsData from "./DeliveryStats";
import Options from "./Options";
import PlayersLobby from "./PlayersLobby";

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



const App: React.FC = () => {

  return (
    <div className="rootframe">
      <Options/>
      <PlayersLobby/>
      <DeliveryStatsData/>
      
    </div>
  );
};

export default App;
