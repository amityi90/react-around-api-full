import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Header from './Header';
import Register from './Register.js';
import Login from './Login'
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from "../utils/api.js";
import { auth } from "../utils/auth";


function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [registrationLink, setRegistrationLink] = React.useState({});

  const [regInfoController, setRegInfoController] = React.useState({ popup: false });

  const [userEmail, setUserEmail] = React.useState("");

  function handleLogout() {
    localStorage.removeItem('JWT');
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin", { replace: true });
  }

  function handleCheckToken() {
    return auth.checkToken(localStorage.getItem('JWT'))
      .then((res) => {
        if (!res.data) {
          navigate("/signin", { replace: true });
          return Promise.reject(new Error('cannot find'))
        }
        api.addToken(localStorage.getItem('JWT'));
        setCurrentUser({
          ...currentUser,
          userName: res.data[0].name,
          userDescription: res.data[0].about,
          userAvatar: res.data[0].avatar,
          userId: res.data[0]._id
        });
        setUserEmail(res.data[0].email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(register) {
    auth.signIn(register)
      .then((res) => {
        if (!res.token) {
          return Promise.reject(new Error('Incorrect email or password'))
        }
        setUserEmail(register.email);
        localStorage.setItem('JWT', res.token);
        handleCheckToken();
        setLoggedIn(true);
        api.addToken(res.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegistration(register) {
    return auth.signUp(register)
      .then((res) => {
        if (!res) {
          setRegInfoController({
            popup: true,
            img: false,
            text: "Oops, something went wrong! Please try again.",
          });
          return Promise.reject(new Error('Incorrect email or password'))
        }
        setRegInfoController({
          popup: true,
          img: true,
          text: "Success! You have now been registered.",
        });
      })
      .catch(() => {
        setRegInfoController({
          popup: true,
          img: false,
          text: "Oops, something went wrong! Please try again.",
        });
      });
  }

  function handlePlaceDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card.cardId !== cardId));
        handleClickClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    console.log(currentUser);
    card.owner = currentUser;
    console.log(card);
    api.postCard(card)
      .then((res) => {
        console.log(res);
        console.log(currentUser.userId);
        card.cardId = res.data._id;
        card.ownerId = card.owner._id;
        card.likesArray = [];
        setCards([card, ...cards]);
        handleClickClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likesArray.includes(currentUser.userId);
    api.changeLikeCardStatus(card.cardId, isLiked)
      .then((res) => {
        setCards(cards.map((resCard) => {
          if (resCard.cardId === card.cardId) {
            resCard.likesArray = res.card.likes;
          }
          return resCard
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(
    () => {
      handleCheckToken();
    },
    []
  );

  React.useEffect(
    () => {
      handleCheckToken()
        .then(() => {
          api.getUserInfo()
            .then((result) => {
              setUserEmail(result.data[0].email);
              setCurrentUser({
                ...currentUser,
                userName: result.data[0].name,
                userDescription: result.data[0].about,
                userAvatar: result.data[0].avatar,
                userId: result.data[0]._id
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    []
  );

  React.useEffect(
    () => {
      handleCheckToken()
        .then(() => {
          api.getInitialCards()
            .then((result) => {
              const initialCards = [];
              result.data.forEach(card => {
                if (card.owner) {
                  initialCards.push({
                    name: card.name,
                    link: card.link,
                    likesArray: card.likes,
                    ownerId: card.owner.userId,
                    cardId: card._id
                  });
                }
              });
              initialCards.reverse();
              setCards(initialCards);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    },
    []
  );




  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handleClickClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])


  const [isEditProfilePopupClose, setIsEditProfilePopupClose] = React.useState(true);
  const [isAddPlacePopupClose, setIsAddPlacePopupClose] = React.useState(true);
  const [isEditAvatarPopupClose, setIsEditAvatarPopupClose] = React.useState(true);
  const [isDeletePopupClose, setIsDeletePopupClose] = React.useState(true);
  const [isImagePopupClose, setIsImagePopupClose] = React.useState(true);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(imgSrc) {
    setIsImagePopupClose(false);
    setSelectedCard(imgSrc);
  }

  function handleCardDelete() {
    setIsDeletePopupClose(false);
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupClose(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupClose(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupClose(false);
  }

  function handleClickClose() {
    setIsEditAvatarPopupClose(true);
    setIsEditProfilePopupClose(true);
    setIsAddPlacePopupClose(true);
    setIsImagePopupClose(true);
    setIsDeletePopupClose(true);

  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((res) => {
        handleClickClose();
        setCurrentUser({
          ...currentUser,
          userName: userInfo.name,
          userDescription: userInfo.profession
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarUrl) {
    api.changeProfilePicture({ picture: avatarUrl })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          userAvatar: avatarUrl
        });
        handleClickClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            userEmail={userEmail}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            registrationLink={registrationLink}
          />
          <Routes>
            <Route path="/*" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  handleCheckToken={handleCheckToken}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  handleCardDelete={handleCardDelete}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handlePlaceDelete}
                  setRegistrationLink={setRegistrationLink}
                />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={<Register
              regInfoController={regInfoController}
              setRegInfoController={setRegInfoController}
              regInfoController={regInfoController}
              onRegisterSubmit={handleRegistration}
              setRegistrationLink={setRegistrationLink}
            />} />
            <Route path="/signin" element={<Login
              onLoginSubmit={handleLogin}
              setRegistrationLink={setRegistrationLink}
            />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isClose={isEditProfilePopupClose}
            onClose={handleClickClose} />
          <AddPlacePopup
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isClose={isAddPlacePopupClose}
            onClose={handleClickClose} />
          <EditAvatarPopup
            isClose={isEditAvatarPopupClose}
            onClose={handleClickClose}
            onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm
            isClose={isDeletePopupClose}
            name="delete"
            title="Are you sure?"
            submit="Yes"
            onClose={handleClickClose} />
          <ImagePopup
            isClose={isImagePopupClose}
            onClose={handleClickClose}
            selectedCard={selectedCard} />
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;


