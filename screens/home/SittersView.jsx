import { useEffect, useState } from "react";
import { getPersonalSitters } from "../../services/firestore_services";
import { List } from "react-native-paper";
import LoadingView from "../../components/LoadingView";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListAvatar from "../../components/ListAvatar";

const SittersView = () => {
  const [sittersData, setSittersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeSitters = getPersonalSitters((data) => {
      setSittersData(data);
      setLoading(false);
    });
    return () => {
      unsubscribeSitters();
    };
  }, []);
  const authenticatedSitters = sittersData.filter(
    (item) => item.isAuthenticated
  );
  const nonAuthenticatedSitters = sittersData.filter(
    (item) => !item.isAuthenticated && item.rejected
  );
  const pendingSitters = sittersData.filter(
    (item) =>
      !item.isAuthenticated &&
      (item.rejected === undefined || item.rejected === null)
  );

  if (loading) {
    return <LoadingView />;
  }

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Pending Accounts</List.Subheader>
        {pendingSitters.length > 0 ? (
          pendingSitters.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Sitter", { item })}
            >
              <List.Item
                key={item.uid}
                title={item.userName || "Unnamed Sitter"}
                description={item.email || "No email provided"}
                right={(props) => (
                  <List.Icon {...props} icon="clock-outline" color="#FFA500" />
                )}
                left={(props) => (
                  <ListAvatar
                    {...props}
                    url={item.profileSetup.profilePicture.cdnUrl}
                  />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No pending accounts" />
        )}

        <List.Subheader>Authenticated Sitters</List.Subheader>
        {authenticatedSitters.length > 0 ? (
          authenticatedSitters.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Sitter", { item })}
            >
              <List.Item
                key={item.uid}
                title={item.userName || "Unnamed Sitter"}
                description={item.email || "No email provided"}
                right={(props) => (
                  <List.Icon {...props} icon="check-decagram" color="#28a745" />
                )}

                left={(props) => (
                  <ListAvatar
                    {...props}
                    url={item.profileSetup.profilePicture.cdnUrl}
                  />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No authenticated Sitters found" />
        )}

        <List.Subheader>Non-Authenticated Sitters</List.Subheader>
        {nonAuthenticatedSitters.length > 0 ? (
          nonAuthenticatedSitters.map((item) => (
            <TouchableOpacity
              key={item.uid}
              onPress={() => navigation.navigate("Sitter", { item })}
            >
              <List.Item
                key={item.uid}
                title={item.userName || "Unnamed Sitter"}
                description={item.email || "No email provided"}
                left={(props) => (
                  <ListAvatar
                    {...props}
                    url={item.profileSetup.profilePicture.cdnUrl}
                  />
                )}
                right={(props) => (
                  <List.Icon {...props} icon="shield-alert" color="#E74C3C" />
                )}
              />
            </TouchableOpacity>
          ))
        ) : (
          <List.Item title="No non-authenticated sitters found" />
        )}
      </List.Section>
    </ScrollView>
  );
};

export default SittersView;
