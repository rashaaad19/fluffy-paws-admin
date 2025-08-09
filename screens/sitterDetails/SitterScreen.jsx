import { useState } from "react";
import {
  ScrollView,
  View,
} from "react-native";
import { Button, Divider, Snackbar, Text, Card } from "react-native-paper";
import StatusChip from "../../components/StatusChip";
import ProfileHeader from "../../components/ProfileHeader";
import ContactInfoCard from "../../components/ContactInfoCard";
import AvailabilityCard from "./components/AvailabilityCard";
import ExperienceCard from "./components/ExperienceCard";
import PersonalIdCard from "./components/PersonalIdCard";
import GallerySection from "../../components/GallerySection";
const SitterProfileScreen = ({ route }) => {
  const { item } = route.params;

  const [isAuthenticated, setIsAuthenticated] = useState(item.isAuthenticated);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  // Determine auth status badges
  const authStatusPending =
    !isAuthenticated && (item.rejected === undefined || item.rejected === null);
  const isRejected = item.rejected === true;

  // Authentication handlers 
  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    setSnackbarMessage("Authenticated successfully");
    setSnackbarColor("#155724");
    setSnackbarVisible(true);
  };
  const handleRejectAuth = () => {
    setSnackbarMessage("Authentication rejected");
    setSnackbarColor("#721c24");
    setSnackbarVisible(true);
  };
  const handleDeleteAccount = () => {
    setSnackbarMessage("Account deleted");
    setSnackbarColor("#e7000b");
    setSnackbarVisible(true);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Header */}
      <ProfileHeader
        name={item.userName || "No Name"}
        bio={item.aboutMe?.bio}
        img={item.profileSetup?.profilePicture?.cdnUrl}
        pets={item.petPreferences?.petTypes || []}
      />

      {/* Status badges */}
      {isAuthenticated && (
        <StatusChip
          backgroundColor="#d4edda"
          textColor="#155724"
          text="Authenticated"
          icon="check"
        />
      )}
      {isRejected && (
        <StatusChip
          backgroundColor="#f8d7da"
          textColor="#721c24"
          text="Rejected"
          icon="close"
        />
      )}
      {authStatusPending && (
        <StatusChip
          backgroundColor="#fff3cd"
          textColor="#856404"
          text="Pending"
          icon="clock-outline"
        />
      )}

      <Divider />

      {/* Contact Info */}
      <ContactInfoCard
        phoneNumber={item.contact?.phoneNumber}
        city={item.contact?.city}
        district={item.contact?.district}
        street={item.contact?.street}
        postlCode={item.contact?.postlCode}
      />
      <Divider />

      {/* Availability */}
      <AvailabilityCard
        availableDays={item.availabilityFrequency?.availableDays}
        hasKids={item.homeInfo?.hasKids}
        homeType={item.homeInfo?.homeType}

      />
      <Divider />

      {/* Experience */}
      <ExperienceCard
        yearsExperience={item.experience?.yearsExperience}
        price={item.experience?.price}
      />
      <Divider />


      {/* Personal ID Document */}
      <PersonalIdCard personalId={item.profileSetup?.personalId} />
      <Divider />

{item.gallery&& <GallerySection images={item.gallery}/>}
      {/* Authentication Actions */}
      {authStatusPending && (
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <Button
            mode="contained"
            style={{ flex: 1, backgroundColor: "#be5985" }}
            onPress={handleAuthenticate}
          >
            Authenticate
          </Button>
          <Button
            mode="outlined"
            textColor="#be5985"
            style={{ flex: 1, borderColor: "#be5985" }}
            onPress={handleRejectAuth}
          >
            Reject
          </Button>
        </View>
      )}

      {/* Delete Account */}
      {isAuthenticated && (
        <Button
          mode="contained"
          style={{ flex: 1, backgroundColor: "#e7000b", marginTop: 16 }}
          onPress={handleDeleteAccount}
        >
          Delete Account
        </Button>
      )}

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarColor }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
          {snackbarMessage}
        </Text>
      </Snackbar>
    </ScrollView>
  );
};

export default SitterProfileScreen;
