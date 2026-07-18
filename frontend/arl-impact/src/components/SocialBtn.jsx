function SocialBtn({ btnObj, onSelect }) {
  return (
    <>
      <div className="wale">
        <img
          src={btnObj.icon}
          alt={btnObj.name}
          className="iconSocial"
          onClick={() => onSelect(btnObj.name)}
        />
        <button className="socialIconLabel" type="button" onClick={() => onSelect(btnObj.name)}>
          {btnObj.name}
        </button>
      </div>
    </>
  );
}

export default SocialBtn;
