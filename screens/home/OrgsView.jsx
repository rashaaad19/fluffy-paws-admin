import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { getOrganizations } from "../../services/firestore_services";
import { List } from "react-native-paper";
import LoadingView from "../../components/LoadingView";
import { useNavigation } from "@react-navigation/native";

const OrgsView = () => {
  const [orgsData, setOrgsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeOrgs = getOrganizations((data) => {
      setOrgsData(data);
      setLoading(false);
    });

    return () => {
      unsubscribeOrgs();
    };
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  const authenticatedOrgs = orgsData.filter((item) => item.isAuthenticated);
  const nonAuthenticatedOrgs = orgsData.filter((item) => !item.isAuthenticated);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Authenticated Organizations</List.Subheader>
        {authenticatedOrgs.length > 0 ? (
          authenticatedOrgs.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Details",{item})}
            >
              <List.Item
                title={item.info?.name || "Unnamed Org"}
                description={item.info?.email || "No email provided"}
                left={(props) => (
                  <List.Icon {...props} icon="office-building" />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No authenticated organizations found" />
        )}

        <List.Subheader>Non-Authenticated Organizations</List.Subheader>
        {nonAuthenticatedOrgs.length > 0 ? (
          nonAuthenticatedOrgs.map((item) => (
            <List.Item
              key={item.uid}
              title={item.info?.name || "Unnamed Org"}
              description={item.info?.email || "No email provided"}
              left={(props) => <List.Icon {...props} icon="office-building" />}
              right={(props) => (
                <List.Icon {...props} icon="shield-alert" color="red" />
              )}
            />
          ))
        ) : (
          <List.Item title="No non-authenticated organizations found" />
        )}
      </List.Section>
    </ScrollView>
  );
};

export default OrgsView;
