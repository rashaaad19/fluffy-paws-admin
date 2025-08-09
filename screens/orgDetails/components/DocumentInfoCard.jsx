import { Linking, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

const DocumentInfoCard = ({ businessLicense, insuranceCertificate, taxId }) => {
  return (
    <Card
      style={{
        marginTop: 16,
        backgroundColor: "white",
        borderRadius: 0,
      }}
      elevation={0}
    >
      <Card.Title title="Documents" titleStyle={{ fontWeight: "bold" }} />
      <Card.Content>
        <TouchableOpacity onPress={() => Linking.openURL(businessLicense)}>
          <Text>📄 Busniess License</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(insuranceCertificate)}>
          <Text>📄 Insurance Certificate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(taxId)}>
          <Text>📄 Tax ID</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default DocumentInfoCard;
