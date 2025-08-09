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
  const nonAuthenticatedOrgs = orgsData.filter(
    (item) => !item.isAuthenticated && item.rejected
  );
  const pendingOrgs = orgsData.filter(
    (item) =>
      !item.isAuthenticated &&
      (item.rejected === undefined || item.rejected === null)
  );

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Pending Accounts</List.Subheader>
        {pendingOrgs.length > 0 ? (
          pendingOrgs.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Orginization", { item })}
            >
              <List.Item
                key={item.uid}
                title={item.info?.name || "Unnamed Org"}
                description={item.info?.email || "No email provided"}
                left={(props) => (
                  <List.Icon {...props} icon="office-building" />
                )}
                right={(props) => (
                  <List.Icon {...props} icon="clock-outline" color="#FFA500" />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No pending accounts" />
        )}

        <List.Subheader>Authenticated Organizations</List.Subheader>
        {authenticatedOrgs.length > 0 ? (
          authenticatedOrgs.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Orginization", { item })}
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
          <List.Item title="No authenticated organizations " />
        )}

        <List.Subheader>Non-Authenticated Organizations</List.Subheader>
        {nonAuthenticatedOrgs.length > 0 ? (
          nonAuthenticatedOrgs.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Orginization", { item })}
            >
              <List.Item
                key={item.uid}
                title={item.info?.name || "Unnamed Org"}
                description={item.info?.email || "No email provided"}
                left={(props) => (
                  <List.Icon {...props} icon="office-building" />
                )}
                right={(props) => (
                  <List.Icon {...props} icon="shield-alert" color="#E74C3C" />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No non-authenticated organizations" />
        )}
      </List.Section>
    </ScrollView>
  );
};

export default OrgsView;
