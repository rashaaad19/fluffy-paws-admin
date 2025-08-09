import { Linking, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

const PersonalIdCard = ({ personalId }) => {
  if (!personalId?.cdnUrl) return null;

  return (
    <Card
      style={{ marginTop: 16, backgroundColor: "white", borderRadius: 0 }}
      elevation={0}
    >
      <Card.Title
        title="Personal Documents"
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <TouchableOpacity onPress={() => Linking.openURL(personalId.cdnUrl)}>
          <Text>📄 Personal ID</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default PersonalIdCard;
