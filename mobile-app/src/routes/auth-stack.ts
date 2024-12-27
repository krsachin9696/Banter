export enum AUTH_STACK_ROUTES {
  HOME_SCREEN = "home-screen",
  CHAT_SCREEN = "chat-screen"
}

export type AuthStackRoutes = {
  [AUTH_STACK_ROUTES.HOME_SCREEN]: {
    currentUser: User;
  };
  [AUTH_STACK_ROUTES.CHAT_SCREEN]: {
    id: string;
    name: string;
    // avatarUrl: string;
    currentUser: User;
  };
}