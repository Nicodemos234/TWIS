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
import { useCallback, useState } from "react";

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setMenuIsOpen((isOpen) => !isOpen);
  }, []);

  const handleAboutClick = useCallback(() => {
    window.open("https://github.com/Nicodemos234/twis", "_blank");
    setMenuIsOpen(false);
  }, []);

  const handleLogoutClick = useCallback(() => {
    console.log("logout");
    setMenuIsOpen(false);
  }, []);

  return (
    <Wrapper>
      <MainLogo src={twisLogo} alt="twis logo" />
      <MenuWrapper>
        Nicodemos234
        <MenuIcon src={menuIcon} alt="menu icon" onClick={handleMenuClick} />
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
    </Wrapper>
  );
};
