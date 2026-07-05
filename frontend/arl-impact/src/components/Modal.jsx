import { useCallback, useEffect, useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  component: Component,
  componentProps = {},
  children,
  title = "",
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShow(false);

    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose, isOpen]);

  const modalContent = Component
    ? typeof Component === "function" ? (
      <Component {...componentProps} />
    ) : (
      Component
    )
    : children;

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${show ? "show" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-container ${show ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={handleClose}
        >
          ✕
        </button>

        {title && <h2  style={{color:"lightblue"}} className="fontdiner-swanky-regular">{title}</h2>}

        <div className="modal-content">
          {modalContent}
        </div>
      </div>
    </div>
  );
}
