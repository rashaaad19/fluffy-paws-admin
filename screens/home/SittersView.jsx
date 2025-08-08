import { useEffect, useState } from "react";
import { getPersonalSitters } from "../../services/firestore_services";
import { List } from "react-native-paper";
import LoadingView from "../../components/LoadingView";
import { ScrollView } from "react-native";

const SittersView = () => {
  const [sittersData, setSittersData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    (item) => !item.isAuthenticated
  );

  if (loading) {
    return <LoadingView />;
  }

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Authenticated Sitters</List.Subheader>
        {authenticatedSitters.length > 0 ? (
          authenticatedSitters.map((item) => (
            <List.Item
              key={item.uid}
              title={item.userName || "Unnamed Sitter"}
              description={item.email || "No email provided"}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
          ))
        ) : (
          <List.Item title="No authenticated Sitters found" />
        )}

        <List.Subheader>Non-Authenticated Sitters</List.Subheader>
        {nonAuthenticatedSitters.length > 0 ? (
          nonAuthenticatedSitters.map((item) => (
            <List.Item
            key={item.uid}
            title={item.userName || "Unnamed Sitter"}
            description={item.email || "No email provided"}
            left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => (
                <List.Icon {...props} icon="shield-alert" color="red" />
              )}
            />
          ))
        ) : (
          <List.Item title="No non-authenticated sitters found" />
        )}
      </List.Section>
    </ScrollView>
  );
};

export default SittersView;
