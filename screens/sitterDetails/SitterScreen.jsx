import { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Button, Divider, Portal, Snackbar, Text } from "react-native-paper";
import StatusChip from "../../components/StatusChip";
import ProfileHeader from "../../components/ProfileHeader";
import ContactInfoCard from "../../components/ContactInfoCard";
import AvailabilityCard from "./components/AvailabilityCard";
import ExperienceCard from "./components/ExperienceCard";
import PersonalIdCard from "./components/PersonalIdCard";
import GallerySection from "../../components/GallerySection";
import {
  authenticateSitter,
  rejectAuthentication,
  deleteAccount,
} from "../../services/firestore_services";
import { useNavigation } from "@react-navigation/native";

const SitterProfileScreen = ({ route }) => {
  const { item } = route.params;

  //---------------- States--------------
  const [isAuthenticated, setIsAuthenticated] = useState(item.isAuthenticated);
  const [isRejected, setIsRejected] = useState(item.rejected);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");
  const [snackTextColor, setSnackTextColor] = useState("");
  const [loadingAuthenticate, setLoadingAuthenticate] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const authStatusPending =
    !isAuthenticated && (isRejected === undefined || isRejected === null);
  const navigation = useNavigation();

  //---------------- Handlers--------------
  const handleAuthenticate = async () => {
    try {
      setLoadingAuthenticate(true);
      await authenticateSitter(
        "personalSitters",
        item.uid,
        setSnackbarVisible,
        setSnackbarMessage,
        setSnackbarColor,
        setSnackTextColor
      );
      setIsAuthenticated(true);
      setIsRejected(false);
    } finally {
      setLoadingAuthenticate(false);
    }
  };

  const handleRejectAuth = async () => {
    try {
      setLoadingReject(true);
      await rejectAuthentication(
        "personalSitters",
        item.uid,
        setSnackbarVisible,
        setSnackbarMessage,
        setSnackbarColor,
        setSnackTextColor
      );
      setIsRejected(true);
    } finally {
      setLoadingReject(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoadingDelete(true);
      await deleteAccount(
        "personalSitters",
        item.uid,
        setSnackbarVisible,
        setSnackbarMessage,
        setSnackbarColor,
        setSnackTextColor
      );

      navigation.navigate("Home");
    } finally {
      setLoadingDelete(false);
    }
  };

  //---------------- Render--------------
  return (
    <>
      {/* Snackbar*/}
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          wrapperStyle={{ top: StatusBar.currentHeight || 0 }}
          style={{ backgroundColor: snackbarColor }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: snackTextColor }}>
            {snackbarMessage}
          </Text>
        </Snackbar>
      </Portal>

      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{
          padding: 16,
          paddingTop: snackbarVisible ? 56 : 16,
        }}
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

        {item.gallery && <GallerySection images={item.gallery} />}
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
              loading={loadingAuthenticate}
              disabled={loadingAuthenticate || loadingReject || loadingDelete}
            >
              Authenticate
            </Button>
            <Button
              mode="outlined"
              textColor="#be5985"
              style={{ flex: 1, borderColor: "#be5985" }}
              onPress={handleRejectAuth}
              loading={loadingReject}
              disabled={loadingAuthenticate || loadingReject || loadingDelete}
            >
              Reject
            </Button>
          </View>
        )}

        {/* Delete Account */}
        {(isAuthenticated||isRejected!==undefined) && (
          <Button
            mode="contained"
            style={{ flex: 1, backgroundColor: "#e7000b", marginTop: 16 }}
            onPress={handleDeleteAccount}
            loading={loadingDelete}
            disabled={loadingAuthenticate || loadingReject || loadingDelete}
          >
            Delete Account
          </Button>
        )}
      </ScrollView>
    </>
  );
};

export default SitterProfileScreen;
