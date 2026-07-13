const STORAGE_KEY = "arlImpactDirectMessages";

function getRecipientKeys(user) {
  return [user?._id, user?.id, user?.userEmail, user?.username, user?.name]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
}

function readDirectMessages() {
  const rawMessages = localStorage.getItem(STORAGE_KEY);
  return rawMessages ? JSON.parse(rawMessages) : [];
}

function writeDirectMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function saveDirectMessage({ message, recipient, sender }) {
  const recipientKeys = getRecipientKeys(recipient);

  if (recipientKeys.length === 0) {
    throw new Error("This member cannot receive direct messages yet.");
  }

  const nextMessage = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    recipientKeys,
    recipientName: recipient.username || recipient.name || "Community Member",
    senderName: sender?.username || sender?.name || "A community member",
    sentAt: new Date().toISOString(),
  };

  writeDirectMessages([nextMessage, ...readDirectMessages()]);
  return nextMessage;
}

export function takeDirectMessagesForUser(user) {
  const userKeys = getRecipientKeys(user);

  if (userKeys.length === 0) return [];

  const messages = readDirectMessages();
  const matchingMessages = messages.filter((message) =>
    message.recipientKeys?.some((recipientKey) => userKeys.includes(recipientKey))
  );
  const remainingMessages = messages.filter(
    (message) => !matchingMessages.some((match) => match.id === message.id)
  );

  writeDirectMessages(remainingMessages);
  return matchingMessages;
}
