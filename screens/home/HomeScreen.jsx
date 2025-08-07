import { SafeAreaView } from "react-native-safe-area-context";
import { getUsers } from "../../services/firestore_services";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsubscribe = getUsers(setUsers);
    return () => unsubscribe();
  }, [getUsers]);

  return (
    <SafeAreaView>
      {users.length > 0 &&
        users.map((user) => <Text key={user.createdAt}>{user.firstName}</Text>)}
    </SafeAreaView>
  );
};

export default HomeScreen;
