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
import { useHeader } from "./useHeader";
import { useAuth } from "../../hooks/useAuth";
export const Header = () => {
  const {
    menuIsOpen,
    username,
    handleMenuClick,
    handleAboutClick,
    handleLogoutClick,
    handleLoginClick,
  } = useHeader();
  const { token } = useAuth();

  return (
    <Wrapper>
      <MainLogo src={twisLogo} alt="twis logo" />
      {token ? (
        <MenuWrapper onClick={handleMenuClick}>
          {username}
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
