import { useTypedSelector } from "./redux";

export function useAuth() {
  const { id, email } = useTypedSelector(
    (state) => state.user as { id: string; email: string }
  );
  return {
    isAuth: !!email,
    email,
    id,
  };
}
