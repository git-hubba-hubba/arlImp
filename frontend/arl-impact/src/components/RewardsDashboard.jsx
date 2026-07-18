const defaultRewards = [
  {
    id: "coffee-gift-card",
    title: "$10 Gift Card",
    type: "Gift Card",
    pointsRequired: 100,
    description: "A starter reward for active community members.",
  },
  {
    id: "car-wash-voucher",
    title: "Car Wash Voucher",
    type: "Voucher",
    pointsRequired: 250,
    description: "Redeem for a local car wash partner voucher.",
  },
  {
    id: "impact-tshirt",
    title: "Impact T-Shirt",
    type: "Merch",
    pointsRequired: 500,
    description: "Wear your Impact role with a branded community tee.",
  },
  {
    id: "restaurant-gift-card",
    title: "$50 Restaurant Gift Card",
    type: "Gift Card",
    pointsRequired: 750,
    description: "Enjoy a meal from a participating Arlington business.",
  },
  {
    id: "smart-tv",
    title: "Smart TV",
    type: "Premium",
    pointsRequired: 1500,
    description: "A top-tier reward for sustained engagement.",
  },
];

const defaultPointRules = [
  { id: "register", action: "Register on site", points: 100 },
  { id: "website", action: "Visit website", points: 25 },
  { id: "business-visit", action: "Visit business", points: 50 },
  { id: "purchase", action: "Make purchase from business", points: 100 },
  { id: "video", action: "Watch video", points: 25 },
  { id: "event", action: "Attend event", points: 100 },
  { id: "vincent", action: "Find Vincent", points: 500 },
];

const badgeTiers = ["Bronze", "Silver", "Gold", "Platinum"];

function RewardsDashboard({ rewards = defaultRewards, userPoints = 0, onRedeem }) {
  const points = Number(userPoints) || 0;
  const sortedRewards = [...rewards].sort(
    (leftReward, rightReward) =>
      Number(leftReward.pointsRequired || 0) - Number(rightReward.pointsRequired || 0)
  );
  const nextReward = sortedRewards.find(
    (reward) => points < Number(reward.pointsRequired || 0)
  );

  const handleRedeem = (reward) => {
    onRedeem?.(reward);
  };

  return (
    <section className="rewardsDashboard">
      <header className="rewardsHeader">
        <div>
          <p className="profileModalEyebrow">Rewards Roadmap</p>
          <h3 className="fontdiner-swanky-regular">Member Rewards</h3>
        </div>
        <div className="rewardsPointBadge">
          <span>{points}</span>
          <strong>Points</strong>
        </div>
      </header>

      {nextReward ? (
        <div className="rewardsNextMilestone">
          <span>{Number(nextReward.pointsRequired || 0) - points} points until</span>
          <strong>{nextReward.title}</strong>
        </div>
      ) : (
        <div className="rewardsNextMilestone">
          <span>All listed rewards unlocked</span>
          <strong>Top tier reached</strong>
        </div>
      )}

      <section className="rewardRulesPanel">
        <header>
          <p className="profileModalEyebrow">Earn Points</p>
          <h4>Impact Reward points scan here.</h4>
        </header>
        <div className="rewardRulesGrid">
          {defaultPointRules.map((rule) => (
            <div className="rewardRule" key={rule.id}>
              <span>{rule.action}</span>
              <strong>{rule.points} pts</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="badgeTierPanel">
        <p className="profileModalEyebrow">Badges</p>
        <div className="badgeTierList">
          {badgeTiers.map((tier) => (
            <span key={tier}>{tier}</span>
          ))}
        </div>
      </section>

      <div className="rewardsRoadmap">
        {sortedRewards.map((reward) => {
          const pointsRequired = Number(reward.pointsRequired || 0);
          const isUnlocked = points >= pointsRequired;
          const progress = pointsRequired > 0 ? Math.min((points / pointsRequired) * 100, 100) : 100;

          return (
            <article
              className={`rewardCard ${isUnlocked ? "rewardUnlocked" : "rewardLocked"}`}
              key={reward.id || reward.title}
            >
              <div className="rewardMarker">
                {isUnlocked ? "✓" : pointsRequired}
              </div>
              <div className="rewardContent">
                <div className="rewardCardHeader">
                  <div>
                    <p className="profileModalEyebrow">{reward.type || "Reward"}</p>
                    <h4>{reward.title}</h4>
                  </div>
                  <span>{pointsRequired} pts</span>
                </div>
                <p>{reward.description}</p>
                <div className="rewardProgressTrack">
                  <div className="rewardProgressFill" style={{ width: `${progress}%` }} />
                </div>
                <button
                  className="signUp rewardRedeemButton"
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => handleRedeem(reward)}
                >
                  {isUnlocked ? "Redeem Now" : "Locked"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RewardsDashboard;
