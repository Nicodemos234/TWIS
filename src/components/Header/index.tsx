import {
  MainLogo,
  Menu,
  MenuButton,
  MenuIcon,
  MenuWrapper,
  Wrapper,
} from "./styles";
import twisLogo from "../../assets/logo.png";
import menuIcon from "../../assets/menu.svg";
import infoIcon from "../../assets/info.svg";
import logoutIcon from "../../assets/logout.svg";
import userIcon from "../../assets/user.svg";
import { useCallback, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { token, logout, login } = useAuth();

  const handleMenuClick = useCallback(() => {
    setMenuIsOpen((isOpen) => !isOpen);
  }, []);

  const handleAboutClick = useCallback(() => {
    window.open("https://github.com/Nicodemos234/twis", "_blank");
    setMenuIsOpen(false);
  }, []);

  const handleLogoutClick = useCallback(() => {
    logout();
    setMenuIsOpen(false);
  }, [logout]);

  const handleLoginClick = useCallback(() => {
    login();
    setMenuIsOpen(false);
  }, [login]);

  return (
    <Wrapper>
      <MainLogo src={twisLogo} alt="twis logo" />
      {token ? (
        <MenuWrapper onClick={handleMenuClick}>
          Nicodemos234
          <MenuIcon src={menuIcon} alt="menu icon" />
          {menuIsOpen && (
            <Menu>
              <MenuButton onClick={handleAboutClick}>
                About <img src={infoIcon} alt="info logo" />
              </MenuButton>
              <MenuButton onClick={handleLogoutClick}>
                Logout <img src={logoutIcon} alt="info logo" />
              </MenuButton>
            </Menu>
          )}
        </MenuWrapper>
      ) : (
        <MenuWrapper onClick={handleLoginClick}>
          Sign-in
          <MenuIcon src={userIcon} alt="user icon" />
        </MenuWrapper>
      )}
    </Wrapper>
  );
};
