import { useRef, useState } from "react";
import { getMediaLabel } from "../utils/media";

function MediaUploadButton({
  accept = "image/*,video/*",
  label = "Upload Media",
  name,
  onChange,
  value,
}) {
  const inputRef = useRef(null);
  const [status, setStatus] = useState(getMediaLabel(value));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const nextValue = reader.result || "";
      setStatus(file.name);
      onChange?.({
        target: {
          name,
          value: nextValue,
        },
      });
    };

    reader.onerror = () => {
      setStatus("Unable to read this file.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mediaUploadControl">
      <button
        className="signUp mediaUploadButton"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        {label}
      </button>
      <input
        ref={inputRef}
        accept={accept}
        className="mediaUploadInput"
        name={name}
        onChange={handleFileChange}
        type="file"
      />
      <span className="mediaUploadStatus">{status}</span>
    </div>
  );
}

export default MediaUploadButton;
