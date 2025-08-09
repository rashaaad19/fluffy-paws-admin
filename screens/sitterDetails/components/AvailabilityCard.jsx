import { Card, Text } from "react-native-paper";
import { View } from "react-native";

const AvailabilityCard = ({ availableDays, hasKids, homeType }) => {
  return (
    <Card
      style={{ marginTop: 16, backgroundColor: "white", borderRadius: 0 }}
      elevation={0}
    >
      <Card.Title title="Availability & House" titleStyle={{ fontWeight: "bold" }} />
      <Card.Content>
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Availability: </Text>
          <Text>{availableDays || "-"}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Has Kids: </Text>
          <Text>{hasKids || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Home Type: </Text>
          <Text>{homeType || "-"}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default AvailabilityCard;
