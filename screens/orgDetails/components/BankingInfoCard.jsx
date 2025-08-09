import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const BankingInfoCard = ({
  bankName,
  accountHolderName,
  accountNumber,
  bankRoutingNumber,
  iban,
}) => {
  const rowStyle = { flexDirection: "row", alignItems: "center", marginBottom: 4 };

  return (
    <Card
      style={{
        marginTop: 16,
        backgroundColor: "white",
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Card.Title title="Banking Details" titleStyle={{ fontWeight: "bold" }} />
      <Card.Content>
        <View style={rowStyle}>
          <Text style={{ fontWeight: "bold" }}>Bank Name: </Text>
          <Text>{bankName}</Text>
        </View>
        <View style={rowStyle}>
          <Text style={{ fontWeight: "bold" }}>Account Holder Name: </Text>
          <Text>{accountHolderName}</Text>
        </View>
        <View style={rowStyle}>
          <Text style={{ fontWeight: "bold" }}>Account Number: </Text>
          <Text>{accountNumber}</Text>
        </View>
        <View style={rowStyle}>
          <Text style={{ fontWeight: "bold" }}>Routing Number: </Text>
          <Text>{bankRoutingNumber}</Text>
        </View>
        <View style={rowStyle}>
          <Text style={{ fontWeight: "bold" }}>IBAN: </Text>
          <Text>{iban}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default BankingInfoCard;
