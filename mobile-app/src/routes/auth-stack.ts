export enum AUTH_STACK_ROUTES {
  HOME_SCREEN = "home-screen",
  CHAT_SCREEN = "chat-screen"
}

export type AuthStackRoutes = {
  [AUTH_STACK_ROUTES.HOME_SCREEN]: undefined;
  [AUTH_STACK_ROUTES.CHAT_SCREEN]: {
    id: string;
    name: string;
  };
}