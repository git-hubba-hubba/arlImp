import React from "react";
import Channel from "../../components/Channel";
import ChannelIcon from "../../components/ChannelIcon";
function FeedWidget() {
  const communicationChannels = [
    {
      name: "Discord",
      abbreviation: "DSC",
      image: "https://cdn.simpleicons.org/discord",
    },
    {
      name: "Zoom",
      abbreviation: "ZOM",
      image: "https://cdn.simpleicons.org/zoom",
    },
    {
      name: "Google Chat",
      abbreviation: "GCH",
      image: "https://cdn.simpleicons.org/googlechat",
    },
    {
      name: "Telegram",
      abbreviation: "TGM",
      image: "https://cdn.simpleicons.org/telegram",
    },
    {
      name: "WhatsApp",
      abbreviation: "WAP",
      image: "https://cdn.simpleicons.org/whatsapp",
    },
    {
      name: "Signal",
      abbreviation: "SIG",
      image: "https://cdn.simpleicons.org/signal",
    },

    {
      name: "Mattermost",
      abbreviation: "MMT",
      image: "https://cdn.simpleicons.org/mattermost",
    },
    {
      name: "Rocket.Chat",
      abbreviation: "RCK",
      image: "https://cdn.simpleicons.org/rocketchat",
    },
    {
      name: "Webex",
      abbreviation: "WBX",
      image: "https://cdn.simpleicons.org/webex",
    },
    {
      name: "Messenger",
      abbreviation: "MSG",
      image: "https://cdn.simpleicons.org/messenger",
    },
    {
      name: "Line",
      abbreviation: "LIN",
      image: "https://cdn.simpleicons.org/line",
    },
    {
      name: "WeChat",
      abbreviation: "WCT",
      image: "https://cdn.simpleicons.org/wechat",
    },
    {
      name: "Reddit Chat",
      abbreviation: "RDT",
      image: "https://cdn.simpleicons.org/reddit",
    },
    {
      name: "LinkedIn Messaging",
      abbreviation: "LNK",
      image: "https://cdn.simpleicons.org/linkedin",
    },
    {
      name: "X (Twitter DM)",
      abbreviation: "XDM",
      image: "https://cdn.simpleicons.org/x",
    },
    {
      name: "Instagram DM",
      abbreviation: "IGD",
      image: "https://cdn.simpleicons.org/instagram",
    },
    {
      name: "Facebook Workplace",
      abbreviation: "FBW",
      image: "https://cdn.simpleicons.org/facebook",
    },
  ];
  return (
    <div>
      {communicationChannels.map((shanel, f) => {
        return (
          <div key={f}>
            <ChannelIcon channelObj={shanel} />
          </div>
        );
      })}
    </div>
  );
}

export default FeedWidget;
