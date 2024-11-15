import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTwitch } from "../../hooks/useTwitch";

export const useHeader = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [username, setUsername] = useState("...");
  const { logout, login, token } = useAuth();
  const { getCurrentUser } = useTwitch();
  useEffect(() => {
    if (token)
      getCurrentUser()
        .then((user) => {
          setUsername(user.display_name || "ERROR TO GET USERNAME");
        })
        .catch(console.error);
  }, [token, getCurrentUser]);

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

  return {
    menuIsOpen,
    username,
    handleMenuClick,
    handleAboutClick,
    handleLogoutClick,
    handleLoginClick,
  };
};
