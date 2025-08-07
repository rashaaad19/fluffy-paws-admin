import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native"; // 👈 Import ScrollView
import { Text, List } from "react-native-paper";
import {
  getPersonalSitters,
  getOrganizations,
} from "../../services/firestore_services";

const HomeScreen = () => {
  const [orgsData, setOrgsData] = useState([]);
  const [sittersData, setSittersData] = useState([]);

  useEffect(() => {
    const unsubscribeSitters = getPersonalSitters(setSittersData);
    const unsubscribeOrgs = getOrganizations(setOrgsData);
    return () => {
      unsubscribeSitters();
      unsubscribeOrgs();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <List.Section>
          <List.Subheader>Organizations</List.Subheader>
          {orgsData.length > 0 ? (
            orgsData.map((item) => (
              <List.Item
                key={item.id}
                title={item.info?.name || "Unnamed Org"}
                description={item.info.email || "No email provided"}
                left={() => <List.Icon icon="office-building" />}
                right={() =>
                  !item.isAuthenticated ? (
                    <List.Icon icon="shield-alert" color="red" />
                  ) : null
                }
              />
            ))
          ) : (
            <Text>No organizations found</Text>
          )}

          <List.Subheader>Personal Sitters</List.Subheader>
          {sittersData.length > 0 ? (
            sittersData.map((item) => (
              <List.Item
                key={item.id}
                title={item.userName || "Unnamed Sitter"}
                description={item.email || "No email provided"}
                left={() => <List.Icon icon="account-heart" />}
                right={() =>
                  !item.isAuthenticated ? (
                    <List.Icon icon="shield-alert" />
                  ) : null
                }
              />
            ))
          ) : (
            <Text>No sitters found</Text>
          )}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
