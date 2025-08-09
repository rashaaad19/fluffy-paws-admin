import { Card, Text } from "react-native-paper";

const ContactInfoCard = ({
  phoneNumber,
  email,
  website,
  street,
  district,
  city,
  postlCode,
}) => {
  return (
    <Card
      style={{
        marginTop: 16,
        backgroundColor: "white",
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Card.Title title="Contact Information" titleStyle={{fontWeight:'bold'}} />
      <Card.Content>
        <Text>📞 {phoneNumber}</Text>
        <Text>📧 {email}</Text>
        <Text>🌍 {website}</Text>
        <Text>
          📍 {street}, {district}, {city}
          , {postlCode}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ContactInfoCard;
