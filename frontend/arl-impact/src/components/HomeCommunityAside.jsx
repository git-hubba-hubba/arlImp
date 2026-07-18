const communityAsideItems = [
  {
    title: "Directory",
    copy: "Find local businesses, nonprofits, community leaders, and resources by category.",
  },
  {
    title: "Community Rules",
    copy: "No hate, division, or drama. Bring kindness, respect, and a willingness to help.",
  },
  {
    title: "Vision",
    copy: "A connected Arlington where members, businesses, churches, nonprofits, and partners all do their part.",
  },
];

function HomeCommunityAside({ items = communityAsideItems }) {
  return (
    <aside className="homeCommunityAside" aria-label="Impact Arlington community information">
      {items.map((item) => (
        <article className="homeAsideCard" key={item.title}>
          <p>{item.title}</p>
          <span>{item.copy}</span>
        </article>
      ))}
    </aside>
  );
}

export default HomeCommunityAside;
