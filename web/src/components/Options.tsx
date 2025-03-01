import "./App.css"
import "./Options.css"
import "./DeliveryStats"
import "./deliveryStats.css"
import "./Options"
import "./PlayersLobby"
import "./playersLobby.css"

// Removed react-native import as it is not used in this web app.
import { OptionsContext } from "../components/Optioncontext";
import image from "../images/image.png"
import logoPostal from "../images/imagecopy.png"
import Gotext from "../images/imagecopy2.png"
import image2 from "../images/imagecopy3.png"
import LogoPostOp from "../images/imagecopy4.png"
import PostOpText from "../images/imagecopy5.png"
import { useState, useContext } from "react"

const handleSelectOption = (option: string) => {
    console.log("Selected option", option);
}

const Options:React.FC = () => {

  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("OptionsContext non trouvé");
  }
  const { isPressed, isPressed2, isPressed3, setIsPressed, setIsPressed2, setIsPressed3 } = context;

  const handlePress = (option: string) => {
    setIsPressed2(false);  // Inverser l'état à chaque pression
    setIsPressed3(false);  // Inverser l'état à chaque pression
    setIsPressed(!isPressed);  // Inverser l'état à chaque pression
    handleSelectOption(option);
  };
  const handlePress2 = (option: string) => {
    setIsPressed3(false);  // Inverser l'état à chaque pression
    setIsPressed(false);  // Inverser l'état à chaque pression

    setIsPressed2(!isPressed2);  // Inverser l'état à chaque pression
    handleSelectOption(option);
  };
  const handlePress3 = (option: string) => {
    setIsPressed3(!isPressed3);  // Inverser l'état à chaque pression
    setIsPressed2(false);  // Inverser l'état à chaque pression
    setIsPressed(false);  // Inverser l'état à chaque pression

    handleSelectOption(option);
  };
return (

    <div className="Optionsframe">
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
      <button className="ButtonSelect" onClick={() => handlePress("solo")} style={{ backgroundColor: isPressed ? '#a4a4a4' : '#ddd' }}>Select</button>
    </div>

    <div className="choice2frame">
    <img className="image22" src={image2} />
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
      <button className="ButtonSelect" onClick={() => handlePress2("duo")} style={{ backgroundColor: isPressed2 ? '#a4a4a4' : '#ddd' }}>Select</button>
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
      <button className="ButtonSelect" onClick={() => handlePress3("squad")} style={{ backgroundColor: isPressed3 ? '#a4a4a4' : '#ddd' }}>Select</button>
    </div>
  </div>

)};


export default Options;