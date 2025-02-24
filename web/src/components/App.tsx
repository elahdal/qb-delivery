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
    <div className="rootframe">
      <Options/>
      <PlayersLobby/>
      <DeliveryStatsData/>
      <div>
        <p>isPresfrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrsed: {isPressed ? "true" : "false"}</p>
        <p>isPreseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesed2: {isPressed2 ? "true" : "false"}</p>
        <p>isPressedeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee3: {isPressed3 ? "true" : "false"}</p>
      </div>
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
