export enum ROOT_STACK_ROUTES {
  AUTH_STACK_LAYOUT = "auth-stack",
  UNAUTH_STACK_LAYOUT = "unauth-stack",
}

export type RootStackRoutes = {
  [ROOT_STACK_ROUTES.AUTH_STACK_LAYOUT]: undefined;
  [ROOT_STACK_ROUTES.UNAUTH_STACK_LAYOUT]: undefined;
}