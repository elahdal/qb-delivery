import "./App.css"
import "./Options.css"
import "./DeliveryStats"
import "./deliveryStats.css"
import "./Options"
import "./PlayersLobby"
import "./playersLobby.css"

import logoDelivery2 from "../images/imagecopy10.png"
import profilepic from "../images/imagecopy6.png"
import logoGoMini from "../images/imagecopy7.png"
import trucPic from "../images/imagecopy8.png"
import logoDelivery from "../images/imagecopy9.png"

import { fetchNui } from "../utils/fetchNui"
import { useState, useEffect } from "react";



interface PlayerStats {
    startAddress: string;
    startAdressZip: string;
    deliveryAddress: string;
    deliveryAdressZip: string;
    name: string;
    status: string;
    dailyDeliveryNb: number;
    progression: number;
}
  
interface PlayerStatsProps {
    playerStats: PlayerStats;
}

// here fetchNui and fill this data
const playerStats : PlayerStats[] = []

// Replace the static data with a dynamic fetch using React hooks.
// const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       console.log("Fetching player stats...");
//       const data = (await fetchNui("getPlayerStats", {})) as PlayerStats[];
//       console.log("Fetched data:", data);
//       setPlayerStats(data);
//     } catch (error) {
//       console.error("Error fetching player stats:", error);
//       // Données statiques de secours pour le débogage dans le navigateur
//       const data: PlayerStats[] = [{
//         startAddress: "4656 West Wood",
//         startAdressZip: "Los Santos 24562",
//         deliveryAddress: "2378 Grase",
//         deliveryAdressZip: "Los Santos 4362",
//         name: "Atiysu Dev",
//         status: "In transit",
//         dailyDeliveryNb: 4,
//         progression: 75 
//       }];
//       setPlayerStats(data);
//     }
//   };

//   fetchData();
// }, []);


const handleMissionStart = async () => {
  try {
    await fetchNui("Start", { start: true });
    console.debug("Mission démarrée avec succès.");
  } catch (error) {
    console.error("Erreur lors du démarrage de la mission :", error);
  }
}

const DeliveryStats:React.FC<PlayerStatsProps> = () => {

  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchNui<PlayerStats[]>("getPlayerStats", {});
        setPlayerStats(rawData);
      } catch (error) {
        console.error("Error fetching player stats:", error);
        // Données statiques de secours pour le débogage dans le navigateur
        const data: PlayerStats[] = [{
          startAddress: "4656 West Wood",
          startAdressZip: "Los Santos 24562",
          deliveryAddress: "2378 Grase",
          deliveryAdressZip: "Los Santos 4362",
          name: "Artemis Dev",
          status: "In transit",
          dailyDeliveryNb: 4,
          progression: 75 
        }];
        setPlayerStats(data);
      }
    };
    fetchData();
  }, []);
    return (
        <div className="deliveryFrame">
        <div className="trucLayaout">
          <img className="imgTruc" src={trucPic} width="471.5px"  />
          <img className="logoImgTruc" src={logoDelivery} width="284px"  />
          <img className="logoImgTruc2" src={logoDelivery2} width="130px"  />
          <img className="logoImgTruc3" src={logoDelivery} width="284px"  />
        </div>
        <div className="deliveryStats">
          <div className="deliveryAdress">
            <svg className="designE" width="132" height="64" viewBox="0 0 132 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.5" d="M108.945 32.7849C108.33 32.9797 107.67 32.9797 107.055 32.7849L106.798 33.5946L107.055 32.7849L3.03717 -0.149372C1.73523 -0.561592 0.850433 -1.76982 0.850433 -3.13545L0.850403 -99.8883C0.850403 -101.254 1.7352 -102.462 3.03712 -102.874L107.055 -135.809C107.67 -136.003 108.33 -136.003 108.945 -135.809L212.963 -102.874C214.265 -102.462 215.15 -101.254 215.15 -99.8883L215.15 -3.13546C215.15 -1.76982 214.265 -0.561592 212.963 -0.149372L108.945 32.7849L109.202 33.5951L108.945 32.7849Z" fill="url(#paint0_linear_0_1)" fill-opacity="0.91" stroke="url(#paint1_linear_0_1)" stroke-width="1.70079"/> <path d="M157.945 62.7849C157.33 62.9797 156.67 62.9797 156.055 62.7849L155.798 63.5946L156.055 62.7849L52.0372 29.8506C50.7352 29.4384 49.8504 28.2302 49.8504 26.8645L49.8504 -69.8883C49.8504 -71.2539 50.7352 -72.4621 52.0371 -72.8744L156.055 -105.809C156.67 -106.003 157.33 -106.003 157.945 -105.809L261.963 -72.8744C263.265 -72.4621 264.15 -71.2539 264.15 -69.8883L264.15 26.8645C264.15 28.2302 263.265 29.4384 261.963 29.8506L157.945 62.7849L158.202 63.5951L157.945 62.7849Z" fill="url(#paint2_linear_0_1)" fill-opacity="0.91" stroke="url(#paint3_linear_0_1)" stroke-width="1.70079"/> <defs> <linearGradient id="paint0_linear_0_1" x1="96.5" y1="29.9999" x2="73.5" y2="-33.0001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint1_linear_0_1" x1="108" y1="33.9763" x2="21" y2="-45.5001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint2_linear_0_1" x1="145.5" y1="59.9999" x2="122.5" y2="-3.00006" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint3_linear_0_1" x1="157" y1="63.9763" x2="70" y2="-15.5001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> </defs> </svg>
            <svg className="designD" width="132" height="64" viewBox="0 0 132 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.5" d="M108.945 32.7849C108.33 32.9797 107.67 32.9797 107.055 32.7849L106.798 33.5946L107.055 32.7849L3.03717 -0.149372C1.73523 -0.561592 0.850433 -1.76982 0.850433 -3.13545L0.850403 -99.8883C0.850403 -101.254 1.7352 -102.462 3.03712 -102.874L107.055 -135.809C107.67 -136.003 108.33 -136.003 108.945 -135.809L212.963 -102.874C214.265 -102.462 215.15 -101.254 215.15 -99.8883L215.15 -3.13546C215.15 -1.76982 214.265 -0.561592 212.963 -0.149372L108.945 32.7849L109.202 33.5951L108.945 32.7849Z" fill="url(#paint0_linear_0_1)" fill-opacity="0.91" stroke="url(#paint1_linear_0_1)" stroke-width="1.70079"/> <path d="M157.945 62.7849C157.33 62.9797 156.67 62.9797 156.055 62.7849L155.798 63.5946L156.055 62.7849L52.0372 29.8506C50.7352 29.4384 49.8504 28.2302 49.8504 26.8645L49.8504 -69.8883C49.8504 -71.2539 50.7352 -72.4621 52.0371 -72.8744L156.055 -105.809C156.67 -106.003 157.33 -106.003 157.945 -105.809L261.963 -72.8744C263.265 -72.4621 264.15 -71.2539 264.15 -69.8883L264.15 26.8645C264.15 28.2302 263.265 29.4384 261.963 29.8506L157.945 62.7849L158.202 63.5951L157.945 62.7849Z" fill="url(#paint2_linear_0_1)" fill-opacity="0.91" stroke="url(#paint3_linear_0_1)" stroke-width="1.70079"/> <defs> <linearGradient id="paint0_linear_0_1" x1="96.5" y1="29.9999" x2="73.5" y2="-33.0001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint1_linear_0_1" x1="108" y1="33.9763" x2="21" y2="-45.5001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint2_linear_0_1" x1="145.5" y1="59.9999" x2="122.5" y2="-3.00006" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> <linearGradient id="paint3_linear_0_1" x1="157" y1="63.9763" x2="70" y2="-15.5001" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white" stop-opacity="0"/> </linearGradient> </defs> </svg>
            <div className="navigation">  
              <button className="left"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.62998 9.00781C7.86692 9.24504 8 9.56662 8 9.9019C8 10.2372 7.86692 10.5588 7.62998 10.796L6.97628 11.4497C6.73922 11.6853 6.41855 11.8176 6.0843 11.8176C5.75004 11.8176 5.42937 11.6853 5.19231 11.4497L0.245279 6.49845C0.0881793 6.34041 0 6.12663 0 5.90379C0 5.68095 0.0881793 5.46717 0.245279 5.30913L5.19231 0.357882C5.43247 0.128193 5.75198 0 6.0843 0C6.41661 0 6.73612 0.128193 6.97628 0.357882L7.62998 1.01158C7.86692 1.24881 8 1.57039 8 1.90567C8 2.24096 7.86692 2.56254 7.62998 2.79977L4.52596 5.90379L7.62998 9.00781Z" fill="white" fill-opacity="0.34"/></svg></button>
              <button className="right"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.370018 9.00781C0.133083 9.24504 0 9.56662 0 9.9019C0 10.2372 0.133083 10.5588 0.370018 10.796L1.02372 11.4497C1.26078 11.6853 1.58145 11.8176 1.9157 11.8176C2.24996 11.8176 2.57063 11.6853 2.80769 11.4497L7.75472 6.49845C7.91182 6.34041 8 6.12663 8 5.90379C8 5.68095 7.91182 5.46717 7.75472 5.30913L2.80769 0.357882C2.56753 0.128193 2.24802 0 1.9157 0C1.58339 0 1.26388 0.128193 1.02372 0.357882L0.370018 1.01158C0.133083 1.24881 0 1.57039 0 1.90567C0 2.24096 0.133083 2.56254 0.370018 2.79977L3.47404 5.90379L0.370018 9.00781Z" fill="white" fill-opacity="0.34"/></svg></button>
              <svg className="mainPage" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="4" cy="4" r="4" fill="white"/> </svg>
              <svg className="secPage" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="3" cy="3" r="3" fill="white" fill-opacity="0.5"/> </svg>
              <svg className="secPage2" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="3" cy="3" r="3" fill="white" fill-opacity="0.5"/> </svg>
              <div className="profile">
                <div className="profiLogo2"><img className="profileLogo2" src={logoGoMini}/></div>
                <img className="profiLogo" src={profilepic} />
                <p className="noIdea2">Personal</p>
                <h1 className="PlayerName2">{playerStats[0]?.name}</h1>
                <div className="deliveryStatus"><p className="dStatus">{playerStats[0]?.status}</p></div>
                <div className="fromToAdresses">
                  <div className="line"></div>
                  <p className="from">From</p>
                  <p className="To">To</p>
                  <svg className="svgLogo" width="16" height="52" viewBox="0 0 16 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="4" fill="white"/> <circle cx="8" cy="8" r="5.6" stroke="white" stroke-opacity="0.28" stroke-width="3.2"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.9 52C7.9 52 12.8 45.7614 12.8 43C12.8 40.2386 10.6062 38 7.9 38C5.1938 38 3 40.2386 3 43C3 45.7614 7.9 52 7.9 52ZM7.9 45C9.0598 45 10 44.0598 10 42.9C10 41.7402 9.0598 40.8 7.9 40.8C6.7402 40.8 5.8 41.7402 5.8 42.9C5.8 44.0598 6.7402 45 7.9 45Z" fill="#555555"/> <path d="M7 30.5C7 30.2239 7.44772 30 8 30C8.55228 30 9 30.2239 9 30.5V32.5C9 32.7761 8.55228 33 8 33C7.44772 33 7 32.7761 7 32.5V30.5Z" fill="white" fill-opacity="0.21"/> <path d="M7 25.5C7 25.2239 7.44772 25 8 25C8.55228 25 9 25.2239 9 25.5V27.5C9 27.7761 8.55228 28 8 28C7.44772 28 7 27.7761 7 27.5V25.5Z" fill="white" fill-opacity="0.21"/> <path d="M7 20.5C7 20.2239 7.44772 20 8 20C8.55228 20 9 20.2239 9 20.5V22.5C9 22.7761 8.55228 23 8 23C7.44772 23 7 22.7761 7 22.5V20.5Z" fill="white" fill-opacity="0.21"/> </svg>
                  <div className="startAdr">
                      <div className="startAdress">
                        <p className="startAdress">
                          <span style={{color: '#FFFFFF'}}>{playerStats[0]?.startAddress},</span>
                          <span style={{color: '#c6c6c6'}}> {playerStats[0]?.startAdressZip}</span>
                        </p>
                      </div> 
                      <div className="deliveryAdressA">
                        <p className="deliveryAdressA">
                          <span style={{color: '#FFFFFF'}}>{playerStats[0]?.deliveryAddress},</span>
                          <span style={{color: '#c6c6c6'}}> {playerStats[0]?.deliveryAdressZip}</span>
                        </p>
                      </div> 
                  </div>
                </div>
              </div>
              
            </div>       
          </div>
          <div className="progressBar">
            <p className="daily">DAILY MISSION</p>
            <p className="missionPerc"><span style={{color: '#5AFFE7'}}>{playerStats[0]?.progression}</span><span style={{color: '#c6c6c6'}}> %</span></p>
            <p className="deliverCount"><span style={{color: '#5AFFE7'}}>Deliver</span><span style={{color: '#c6c6c6'}}> {playerStats[0]?.dailyDeliveryNb} Times</span></p>
  
            <div className='container'><div className='bar'></div><div className="emptyBar"></div></div>
          </div>
          <button className="startB" onClick={() => handleMissionStart()}>Start</button>
        </div>
  
        </div>
  
    )
};

const DeliveryStatsData: React.FC = () => {
    return (
        <DeliveryStats playerStats={playerStats[0]} />
    )
};

export default DeliveryStatsData;
