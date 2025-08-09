import { Image, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, Badge } from "react-native-paper";

const ProfileHeader = ({ img, name, description, pets }) => {
  return (
    <View style={{ alignItems: "center", marginBottom: 16 }}>
      <Image
        source={{ uri: img }}
        style={{ width: 150, height: 150, borderRadius: 50 }}
      />

      {/* Name + Badge Row */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <Text
          style={{ color: "#be5985", fontWeight: "bold", marginRight: 8 }}
          variant="titleLarge"
        >
          {name}
        </Text>
       
      </View>

      <Text style={{textAlign:'center'}}>{description}</Text>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        {pets.map((pet, index) => {
          const lowerPet = pet.toLowerCase();
          return (
            <View key={index} style={{ alignItems: "center", gap: 2 }}>
              <FontAwesome6
                name={lowerPet === "cats" ? "cat" : "dog"}
                size={32}
                color={"#be5985"}
              />
              <Text>{pet}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileHeader;
