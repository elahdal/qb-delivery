import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import "./PlayerStatus.css"
import "./Choices.css"
import "./deliveryStats.css"
import image from "../images/image.png"
import logoPostal from "../images/image copy.png"
import Gotext from "../images/image copy 2.png"

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);


interface Player {
  id: number;
  playerState: string;
  time: string;
}

interface PlayerContainerProps {
  player: Player;
}

const players: Player[] = [
  { id: 1, playerState: "AFK", time: "01:22:20" },
  { id: 2, playerState: "Ready", time: "01:22:20" },
  { id: 3, playerState: "Ready", time: "01:22:20" },
  { id: 3, playerState: "Ready", time: "01:22:20" },
  { id: 3, playerState: "Ready", time: "01:22:20" },
  { id: 3, playerState: "Ready", time: "01:22:20" },
];

const PlayerContainer: React.FC<PlayerContainerProps> = ({ player }) => (
  <div className="playercontainer">
    <button className="playersituationB" onClick={() => console.log("Action sur", player.playerState)}>
      {player.playerState}
    </button>
    <button className="inviteB">
      <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.2335 0C14.8293 0 17.1457 5.57997 13.8929 8.83119C10.6405 12.0821 5.05772 9.76697 5.05772 5.17326C5.05772 2.31606 7.37502 0 10.2335 0ZM23.2262 24.1679H20.4669V26.926H18.561V24.1679H15.8017V22.2632H18.561V19.5051H20.4666V22.2632H23.2259L23.2262 24.1679ZM18.5588 17.3195L20.457 17.2377C20.2969 13.7167 17.3694 10.9069 13.8332 10.9069H6.63346C2.98297 10.9069 0 13.8889 0 17.5372V21.0855C0 22.7827 1.38555 24.1679 3.08395 24.1679H13.5742V22.2632H3.08395C2.43779 22.2632 1.90563 21.7311 1.90563 21.0855V17.5372C1.90563 14.9402 4.03521 12.8113 6.63346 12.8113H13.8332C16.3558 12.8113 18.4454 14.8157 18.5588 17.3195ZM12.5455 2.86216C10.4909 0.808467 6.96335 2.27021 6.96335 5.17326C6.96335 8.07631 10.4912 9.53806 12.5455 7.48436C13.8226 6.20816 13.8226 4.13836 12.5455 2.86216Z" fill="white" fillOpacity="0.7"/></svg>
    </button>
    <div className="playertime">{player.time}</div>
  </div>
);

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({player}) =>(
  <div className="playerstats">
    <div className="playerstatsname">{player.playerState}</div>
    <div className="playerstatstime">{player.id}</div>
  </div>
);



const App: React.FC = () => {

 

  return (
    <div className="rootframe">
    <div className="deliveryOption-1">
      <div className="deliveryOption">
        <div className="designframe1"></div>
        <div className="designframe2"></div>

        <div className="choice1frame">
          <img className="image1" src={image} />
          <img className="logoPostal" src={logoPostal} />
          <div className="goRequierment">
            <img className="goText" src={Gotext} />
            <p className="textholder">Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis.</p>
            
          </div>

        </div>
        <div className="choice2frame"></div>
        <div className="choice3frame"></div>


      </div>
    </div>    




     <div className="framecontainerPlayerStatus-1">
      <div className="framecontainer">    
        {players.map(player => (
          <PlayerContainer key={player.id} player={player} />
        ))}
      </div>
    </div>

    

    <div className="deliveryFrame">

    </div>













    </div>
  );
};

export default App;
