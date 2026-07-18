const defaultPostcards = [
  {
    id: "impact-postcard-one",
    title: "Walk With Us",
    subtitle: "Community events, local support, and practical rewards.",
    image:
      "https://arlington.impactingcitiestx.com/wp-content/uploads/2025/11/Postcard-side-2-1024x732.jpg",
  },
  {
    id: "impact-postcard-two",
    title: "Support Local",
    subtitle: "Discover Arlington businesses that are investing back into the community.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "impact-postcard-three",
    title: "Earn Rewards",
    subtitle: "Take action, attend events, visit partners, and build your Impact points.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80",
  },
];

function HomePostcardSlider({ postcards = defaultPostcards }) {
  return (
    <section className="homePostcardSlider" aria-label="Impact Arlington postcards">
      <div className="postcardTrack">
        {postcards.map((postcard) => (
          <article className="postcardSlide" key={postcard.id || postcard.title}>
            <img src={postcard.image} alt={postcard.title} />
            <div className="postcardCaption">
              <strong>{postcard.title}</strong>
              <span>{postcard.subtitle}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePostcardSlider;
