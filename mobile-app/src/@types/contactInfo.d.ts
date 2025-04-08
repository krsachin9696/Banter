interface ContactInfoProps {
  userID: string;
  name: string;
  latestMessage: string | undefined;
  time: string;
  status?: MessageStatus;
  unreadMessages: number;
}