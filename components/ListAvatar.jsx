import { Avatar } from "react-native-paper";

const ListAvatar = ({ url,...props }) => {
  return (
    <Avatar.Image
    {...props}
      size={40}
      source={{
        uri:
          url ||
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
      }}
    />
  );
};

export default ListAvatar;
