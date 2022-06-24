import { logout } from "../apis/UserAPI";
import { ExitIcon } from "../Icons/ExitIcon";

export const Logout =   ({  size, onSelect }) => {
  return (
    <ExitIcon
      size={size}
      onSelect={async () => {
        if (onSelect !== undefined) {
          onSelect();
        }
       
        await logout();
      }}
    />
  );
};
