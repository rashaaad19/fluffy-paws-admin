import { Chip } from "react-native-paper";

const StatusChip = ({ icon, backgroundColor, textColor, text }) => {
  return (
    <Chip
      icon={icon}
      style={{
        backgroundColor:  backgroundColor ,
        alignSelf: "center",
        marginBottom: 16,
      }}
      textStyle={{ color: textColor  }}
    >
      {text}
    </Chip>
  );
};

export default StatusChip;
