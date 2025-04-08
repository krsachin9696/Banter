export enum UNAUTH_STACK_ROUTES {
  LOGIN = "login",
  REGISTER = "register",
}

export type UnauthStackRoutes = {
  [UNAUTH_STACK_ROUTES.LOGIN]: undefined;
  [UNAUTH_STACK_ROUTES.REGISTER]: undefined;
}