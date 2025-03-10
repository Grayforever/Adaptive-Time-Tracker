import { useMemo } from "react";

const useAuthority = (
  userAuthority: string[] = [],
  authority: string[] = [],
  emptyCheck = false
) => {
  const roleMatch = useMemo(() => {
    return authority.some((role) => userAuthority.includes(role));
  }, [userAuthority, authority]);

  if (
    authority.length === 0 ||
    userAuthority.length === 0 ||
    typeof authority === "undefined"
  ) {
    return emptyCheck;
  }

  return roleMatch;
};

export default useAuthority;
