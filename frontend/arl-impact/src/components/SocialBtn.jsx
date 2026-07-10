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
      </div>
    </>
  );
}

export default SocialBtn;
