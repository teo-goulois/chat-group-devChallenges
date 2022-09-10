import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import useSWR from "swr";
// Types

function useConnectedUser() {
  const { data: session } = useSession();

  const { data, error } = useSWR(Key(session));
  return {
    user: data as User,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useConnectedUser;

const Key = (session: Session | null) => {
  return session?.user ? `/api/user/${session?.user._id}` : null;
};
