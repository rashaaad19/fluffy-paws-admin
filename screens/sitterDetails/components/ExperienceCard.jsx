import { Card, Text } from "react-native-paper";
import { View } from "react-native";

const ExperienceCard = ({ yearsExperience, price }) => {
  return (
    <Card
      style={{ marginTop: 16, backgroundColor: "white", borderRadius: 0 }}
      elevation={0}
    >
      <Card.Title
        title="Experience & Pricing"
        titleStyle={{ fontWeight: "bold" }}
      />
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Years of Experience: </Text>
          <Text>{yearsExperience || "-"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Price per Service: </Text>
          <Text>{price ? `£${price}` : "-"}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ExperienceCard;
