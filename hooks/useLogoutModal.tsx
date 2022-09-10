import { useState } from "react";

// Centralizes modal control
const useLogoutModal = () => {
  const [modalOpen, setModalOpen] = useState(false);  

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return { modalOpen, close, open };
};

export default useLogoutModal;