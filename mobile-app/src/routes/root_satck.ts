export enum ROOT_STACK_ROUTES {
  REGISTRATION = "registration",
  HOME_SCREEN = "home-screen",
  CHAT_SCREEN = "chat-screen"
}

export type RootStackRoutes = {
  [ROOT_STACK_ROUTES.HOME_SCREEN]: {
    currentUser: User;
  };
  [ROOT_STACK_ROUTES.CHAT_SCREEN]: {
    id: string;
    name: string;
    // avatarUrl: string;
    currentUser: User;
  };
  [ROOT_STACK_ROUTES.REGISTRATION]: undefined;
}