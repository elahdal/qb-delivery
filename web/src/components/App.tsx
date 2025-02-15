import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import "./PlayerStatus.css"
import "./Choices.css"
import "./deliveryStats.css"
import image from "../images/image.png"
import image2 from "../images/image copy 3.png"
import logoPostal from "../images/image copy.png"
import LogoPostOp from "../images/image copy 4.png"
import Gotext from "../images/image copy 2.png"
import PostOpText from "../images/image copy 5.png"
import profilepic from "../images/image copy 6.png"
import logoGoMini from "../images/image copy 7.png"

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
  image: string;
  image2: string;
}

interface PlayerContainerProps {
  player: Player;
}

const players: Player[] = [
  { id: 1, playerState: "AFK", time: "01:22:20", image: profilepic, image2: logoGoMini },
  { id: 2, playerState: "Ready", time: "01:22:20" , image: profilepic, image2: logoGoMini  },
  { id: 3, playerState: "Ready", time: "01:22:20", image: profilepic, image2: logoGoMini  },
  { id: 3, playerState: "Ready", time: "01:22:20" , image: profilepic, image2: logoGoMini },
  { id: 3, playerState: "Ready", time: "01:22:20", image: profilepic, image2: logoGoMini  },
  { id: 3, playerState: "Ready", time: "01:22:20" , image: profilepic, image2: logoGoMini },
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
    
    <div className="profiLogo2">
    <img className="profileLogo2" src={player.image2} />
    </div>
    <img className="profiLogo" src={player.image} />
    <h1 className="PlayerName">Atiysu Dev</h1>
    <p className="noIdea">Personal</p>
    <div className="level">
    <svg className="levellogo" width="10" height="10" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 0L5.59808 1.5V4.5L3 6L0.401924 4.5V1.5L3 0Z" fill="#79F1E0"/></svg>
    <p className="leveltext">12.Lvl</p>
    </div>
    
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
            <div className="quantity">
              <svg className="box" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5078 5.61248L1.96201 2.91874L0 7.98117L7.50271 10.746L9.5078 5.61248Z" fill="white"/><path d="M10.3718 0V4.83323L17.108 2.43047L10.3718 0Z" fill="white"/><path d="M9.62827 4.83323V0L2.89208 2.4304L9.62827 4.83323Z" fill="white"/><path d="M10.4923 5.61248L12.4973 10.7457L20 7.98086L18.038 2.91844L10.4923 5.61248Z" fill="white"/><path d="M12.286 11.6213C12.1367 11.6213 11.9976 11.5305 11.9394 11.3791L10.3721 7.36082V16.3636L17.8823 13.7107V9.58596L12.4123 11.6017C12.3705 11.6148 12.329 11.6213 12.286 11.6213Z" fill="#ADADAD"/><path d="M7.71405 11.6213C7.6723 11.6213 7.62929 11.6147 7.59134 11.5976L2.12137 9.58193V13.7107L9.62797 16.3597V7.36093L8.06065 11.3792C8.0012 11.5306 7.86205 11.6213 7.71405 11.6213Z" fill="#ADADAD"/></svg>
              <p className="quant">100x</p>
            </div>
            <div className="MoneyEarned">
              <svg className="MoneyEarnedLogo" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49997 0C3.3633 0 0 3.3633 0 7.49997C0 11.6366 3.3633 14.9999 7.49997 14.9999C11.6366 14.9999 14.9999 11.6366 14.9999 7.49997C15.016 3.3633 11.6366 0 7.49997 0ZM9.66296 10.4685C9.33113 10.8633 8.90494 11.1316 8.41585 11.2741C8.19505 11.337 8.10006 11.448 8.11611 11.6688C8.13214 11.8896 8.11611 12.111 8.11611 12.3318C8.11611 12.5372 8.02112 12.6316 7.81636 12.6316C7.57952 12.6476 7.34268 12.6476 7.08979 12.6316C6.88441 12.6316 6.79005 12.5212 6.79005 12.2997V11.81C6.79005 11.4467 6.77401 11.4313 6.42676 11.3838C5.98453 11.3209 5.55835 11.2099 5.14757 11.0205C4.83178 10.8626 4.80033 10.7837 4.89469 10.4519C4.9576 10.199 5.03654 9.96214 5.10007 9.70989C5.19506 9.42555 5.27401 9.3941 5.52626 9.52054C5.96849 9.74134 6.44218 9.88383 6.93127 9.94673C7.24706 9.97819 7.56284 9.96277 7.86259 9.83633C8.41522 9.59949 8.51021 8.95187 8.03653 8.57317C7.87863 8.44674 7.7047 8.35238 7.51535 8.27343C7.02563 8.05263 6.53653 7.89474 6.07826 7.62581C5.33629 7.18358 4.8626 6.56805 4.92551 5.66824C4.98842 4.65797 5.57313 4.01035 6.48841 3.67846C6.8671 3.5366 6.8671 3.5366 6.8671 3.14187V2.73109C6.88314 2.43135 6.93001 2.36781 7.23038 2.36781H7.51472C8.16234 2.36781 8.16234 2.36781 8.16234 3.01543C8.16234 3.47307 8.16234 3.47307 8.61998 3.55201C8.96722 3.61493 9.29905 3.70991 9.61484 3.85176C9.78877 3.93071 9.86772 4.04111 9.80418 4.23045C9.72524 4.49875 9.64629 4.79913 9.5513 5.06742C9.45632 5.3203 9.37736 5.36717 9.14052 5.24136C8.63539 4.98847 8.11421 4.89411 7.54548 4.92557C7.40362 4.9416 7.26114 4.95702 7.11929 5.02055C6.62956 5.22594 6.55062 5.76253 6.97743 6.07831C7.18282 6.25225 7.41966 6.36265 7.67191 6.45701C8.0981 6.63094 8.52429 6.80425 8.91902 7.02568C10.2155 7.73682 10.5628 9.34718 9.66296 10.4685Z" fill="white"/></svg>
              <p className="MoneyEarnedText">115</p>
              <p className="MoneyEarnedTextk">k</p>
            </div>
            <div className="PlayerReq">
              <svg className="PlayerReqLogo" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6641 8.26667C11.5349 8.12458 11.3154 8.1375 11.1862 8.27958C9.99787 9.54542 8.31871 10.3334 6.4585 10.3334C4.59829 10.3334 2.91933 9.54546 1.73079 8.27958C1.60162 8.1375 1.38204 8.12458 1.2529 8.26667C0.465 9.17083 0 10.3333 0 11.625V12.9167C0 13.3817 0.245417 13.8208 0.658771 14.0404C1.87294 14.6992 3.90087 15.5 6.45825 15.5C7.85325 15.5 9.99742 15.2546 12.2321 14.0533C12.6583 13.8337 12.9167 13.3946 12.9167 12.9167V11.625C12.9167 10.3333 12.452 9.17083 11.6641 8.26667Z" fill="white"/><path d="M10.3336 3.875C10.3336 6.01433 8.59791 7.75 6.45858 7.75C4.31925 7.75 2.58358 6.01433 2.58358 3.875C2.58358 1.73567 4.31925 0 6.45858 0C8.59791 0 10.3336 1.73567 10.3336 3.875Z" fill="white"/></svg>
              <p className="PlayerReqText">4</p>
            </div>
          </div>

          <div className="missionText">
          <p className="textholderMission"> elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis. Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis</p>
          </div>
          <button className="ButtonSelect">Select</button>
        </div>

        <div className="choice2frame">
        <img className="image1" src={image2} />
          <img className="logoPostal" src={LogoPostOp} />
          <div className="goRequierment">
            <img className="goText" src={PostOpText} />
            <p className="textholder">Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis.</p>
            <div className="quantity">
              <svg className="box" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5078 5.61248L1.96201 2.91874L0 7.98117L7.50271 10.746L9.5078 5.61248Z" fill="white"/><path d="M10.3718 0V4.83323L17.108 2.43047L10.3718 0Z" fill="white"/><path d="M9.62827 4.83323V0L2.89208 2.4304L9.62827 4.83323Z" fill="white"/><path d="M10.4923 5.61248L12.4973 10.7457L20 7.98086L18.038 2.91844L10.4923 5.61248Z" fill="white"/><path d="M12.286 11.6213C12.1367 11.6213 11.9976 11.5305 11.9394 11.3791L10.3721 7.36082V16.3636L17.8823 13.7107V9.58596L12.4123 11.6017C12.3705 11.6148 12.329 11.6213 12.286 11.6213Z" fill="#ADADAD"/><path d="M7.71405 11.6213C7.6723 11.6213 7.62929 11.6147 7.59134 11.5976L2.12137 9.58193V13.7107L9.62797 16.3597V7.36093L8.06065 11.3792C8.0012 11.5306 7.86205 11.6213 7.71405 11.6213Z" fill="#ADADAD"/></svg>
              <p className="quant">100x</p>
            </div>
            <div className="MoneyEarned">
              <svg className="MoneyEarnedLogo" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49997 0C3.3633 0 0 3.3633 0 7.49997C0 11.6366 3.3633 14.9999 7.49997 14.9999C11.6366 14.9999 14.9999 11.6366 14.9999 7.49997C15.016 3.3633 11.6366 0 7.49997 0ZM9.66296 10.4685C9.33113 10.8633 8.90494 11.1316 8.41585 11.2741C8.19505 11.337 8.10006 11.448 8.11611 11.6688C8.13214 11.8896 8.11611 12.111 8.11611 12.3318C8.11611 12.5372 8.02112 12.6316 7.81636 12.6316C7.57952 12.6476 7.34268 12.6476 7.08979 12.6316C6.88441 12.6316 6.79005 12.5212 6.79005 12.2997V11.81C6.79005 11.4467 6.77401 11.4313 6.42676 11.3838C5.98453 11.3209 5.55835 11.2099 5.14757 11.0205C4.83178 10.8626 4.80033 10.7837 4.89469 10.4519C4.9576 10.199 5.03654 9.96214 5.10007 9.70989C5.19506 9.42555 5.27401 9.3941 5.52626 9.52054C5.96849 9.74134 6.44218 9.88383 6.93127 9.94673C7.24706 9.97819 7.56284 9.96277 7.86259 9.83633C8.41522 9.59949 8.51021 8.95187 8.03653 8.57317C7.87863 8.44674 7.7047 8.35238 7.51535 8.27343C7.02563 8.05263 6.53653 7.89474 6.07826 7.62581C5.33629 7.18358 4.8626 6.56805 4.92551 5.66824C4.98842 4.65797 5.57313 4.01035 6.48841 3.67846C6.8671 3.5366 6.8671 3.5366 6.8671 3.14187V2.73109C6.88314 2.43135 6.93001 2.36781 7.23038 2.36781H7.51472C8.16234 2.36781 8.16234 2.36781 8.16234 3.01543C8.16234 3.47307 8.16234 3.47307 8.61998 3.55201C8.96722 3.61493 9.29905 3.70991 9.61484 3.85176C9.78877 3.93071 9.86772 4.04111 9.80418 4.23045C9.72524 4.49875 9.64629 4.79913 9.5513 5.06742C9.45632 5.3203 9.37736 5.36717 9.14052 5.24136C8.63539 4.98847 8.11421 4.89411 7.54548 4.92557C7.40362 4.9416 7.26114 4.95702 7.11929 5.02055C6.62956 5.22594 6.55062 5.76253 6.97743 6.07831C7.18282 6.25225 7.41966 6.36265 7.67191 6.45701C8.0981 6.63094 8.52429 6.80425 8.91902 7.02568C10.2155 7.73682 10.5628 9.34718 9.66296 10.4685Z" fill="white"/></svg>
              <p className="MoneyEarnedText">115</p>
              <p className="MoneyEarnedTextk">k</p>
            </div>
            <div className="PlayerReq">
              <svg className="PlayerReqLogo" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6641 8.26667C11.5349 8.12458 11.3154 8.1375 11.1862 8.27958C9.99787 9.54542 8.31871 10.3334 6.4585 10.3334C4.59829 10.3334 2.91933 9.54546 1.73079 8.27958C1.60162 8.1375 1.38204 8.12458 1.2529 8.26667C0.465 9.17083 0 10.3333 0 11.625V12.9167C0 13.3817 0.245417 13.8208 0.658771 14.0404C1.87294 14.6992 3.90087 15.5 6.45825 15.5C7.85325 15.5 9.99742 15.2546 12.2321 14.0533C12.6583 13.8337 12.9167 13.3946 12.9167 12.9167V11.625C12.9167 10.3333 12.452 9.17083 11.6641 8.26667Z" fill="white"/><path d="M10.3336 3.875C10.3336 6.01433 8.59791 7.75 6.45858 7.75C4.31925 7.75 2.58358 6.01433 2.58358 3.875C2.58358 1.73567 4.31925 0 6.45858 0C8.59791 0 10.3336 1.73567 10.3336 3.875Z" fill="white"/></svg>
              <p className="PlayerReqText">4</p>
            </div>
          </div>

          <div className="missionText">
          <p className="textholderMission"> elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis. Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis</p>
          </div>
          <button className="ButtonSelect">Select</button>
        </div>

        <div className="choice3frame">
        <img className="image1" src={image} />
          <img className="logoPostal" src={logoPostal} />
          <div className="goRequierment">
            <img className="goText" src={Gotext} />
            <p className="textholder">Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis.</p>
            <div className="quantity">
              <svg className="box" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5078 5.61248L1.96201 2.91874L0 7.98117L7.50271 10.746L9.5078 5.61248Z" fill="white"/><path d="M10.3718 0V4.83323L17.108 2.43047L10.3718 0Z" fill="white"/><path d="M9.62827 4.83323V0L2.89208 2.4304L9.62827 4.83323Z" fill="white"/><path d="M10.4923 5.61248L12.4973 10.7457L20 7.98086L18.038 2.91844L10.4923 5.61248Z" fill="white"/><path d="M12.286 11.6213C12.1367 11.6213 11.9976 11.5305 11.9394 11.3791L10.3721 7.36082V16.3636L17.8823 13.7107V9.58596L12.4123 11.6017C12.3705 11.6148 12.329 11.6213 12.286 11.6213Z" fill="#ADADAD"/><path d="M7.71405 11.6213C7.6723 11.6213 7.62929 11.6147 7.59134 11.5976L2.12137 9.58193V13.7107L9.62797 16.3597V7.36093L8.06065 11.3792C8.0012 11.5306 7.86205 11.6213 7.71405 11.6213Z" fill="#ADADAD"/></svg>
              <p className="quant">100x</p>
            </div>
            <div className="MoneyEarned">
              <svg className="MoneyEarnedLogo" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49997 0C3.3633 0 0 3.3633 0 7.49997C0 11.6366 3.3633 14.9999 7.49997 14.9999C11.6366 14.9999 14.9999 11.6366 14.9999 7.49997C15.016 3.3633 11.6366 0 7.49997 0ZM9.66296 10.4685C9.33113 10.8633 8.90494 11.1316 8.41585 11.2741C8.19505 11.337 8.10006 11.448 8.11611 11.6688C8.13214 11.8896 8.11611 12.111 8.11611 12.3318C8.11611 12.5372 8.02112 12.6316 7.81636 12.6316C7.57952 12.6476 7.34268 12.6476 7.08979 12.6316C6.88441 12.6316 6.79005 12.5212 6.79005 12.2997V11.81C6.79005 11.4467 6.77401 11.4313 6.42676 11.3838C5.98453 11.3209 5.55835 11.2099 5.14757 11.0205C4.83178 10.8626 4.80033 10.7837 4.89469 10.4519C4.9576 10.199 5.03654 9.96214 5.10007 9.70989C5.19506 9.42555 5.27401 9.3941 5.52626 9.52054C5.96849 9.74134 6.44218 9.88383 6.93127 9.94673C7.24706 9.97819 7.56284 9.96277 7.86259 9.83633C8.41522 9.59949 8.51021 8.95187 8.03653 8.57317C7.87863 8.44674 7.7047 8.35238 7.51535 8.27343C7.02563 8.05263 6.53653 7.89474 6.07826 7.62581C5.33629 7.18358 4.8626 6.56805 4.92551 5.66824C4.98842 4.65797 5.57313 4.01035 6.48841 3.67846C6.8671 3.5366 6.8671 3.5366 6.8671 3.14187V2.73109C6.88314 2.43135 6.93001 2.36781 7.23038 2.36781H7.51472C8.16234 2.36781 8.16234 2.36781 8.16234 3.01543C8.16234 3.47307 8.16234 3.47307 8.61998 3.55201C8.96722 3.61493 9.29905 3.70991 9.61484 3.85176C9.78877 3.93071 9.86772 4.04111 9.80418 4.23045C9.72524 4.49875 9.64629 4.79913 9.5513 5.06742C9.45632 5.3203 9.37736 5.36717 9.14052 5.24136C8.63539 4.98847 8.11421 4.89411 7.54548 4.92557C7.40362 4.9416 7.26114 4.95702 7.11929 5.02055C6.62956 5.22594 6.55062 5.76253 6.97743 6.07831C7.18282 6.25225 7.41966 6.36265 7.67191 6.45701C8.0981 6.63094 8.52429 6.80425 8.91902 7.02568C10.2155 7.73682 10.5628 9.34718 9.66296 10.4685Z" fill="white"/></svg>
              <p className="MoneyEarnedText">115</p>
              <p className="MoneyEarnedTextk">k</p>
            </div>
            <div className="PlayerReq">
              <svg className="PlayerReqLogo" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.6641 8.26667C11.5349 8.12458 11.3154 8.1375 11.1862 8.27958C9.99787 9.54542 8.31871 10.3334 6.4585 10.3334C4.59829 10.3334 2.91933 9.54546 1.73079 8.27958C1.60162 8.1375 1.38204 8.12458 1.2529 8.26667C0.465 9.17083 0 10.3333 0 11.625V12.9167C0 13.3817 0.245417 13.8208 0.658771 14.0404C1.87294 14.6992 3.90087 15.5 6.45825 15.5C7.85325 15.5 9.99742 15.2546 12.2321 14.0533C12.6583 13.8337 12.9167 13.3946 12.9167 12.9167V11.625C12.9167 10.3333 12.452 9.17083 11.6641 8.26667Z" fill="white"/><path d="M10.3336 3.875C10.3336 6.01433 8.59791 7.75 6.45858 7.75C4.31925 7.75 2.58358 6.01433 2.58358 3.875C2.58358 1.73567 4.31925 0 6.45858 0C8.59791 0 10.3336 1.73567 10.3336 3.875Z" fill="white"/></svg>
              <p className="PlayerReqText">4</p>
            </div>
          </div>

          <div className="missionText">
          <p className="textholderMission"> elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis. Forem ipsum dolor sit amet, consectetur adipis cing elit. Nunc vulputate libero et velit interduı aliquet odio matti consectetur adipis</p>
          </div>
          <button className="ButtonSelect">Select</button>
        </div>


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
