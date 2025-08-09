import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Snackbar, Chip } from "react-native-paper";
import ProfileHeader from "../../components/ProfileHeader";
import ContactInfoCard from "../../components/ContactInfoCard";
import BankingInfoCard from "../../components/BankingInfoCard";
import DocumentInfoCard from "../../components/DocumentInfoCard";
import GallerySection from "../../components/GallerySection";
import {
  authenticateSitter,
  deleteAccount,
  rejectAuthentication,
} from "../../services/firestore_services";

//TODO: Divide the UI blocks into reusable components - Add functionality for Sitters screen - Add pending list section in home
const OrginizationScreen = ({ route }) => {
  const { item } = route.params;

  const [isAuthenticated, setIsAuthenticated] = useState(item.isAuthenticated);
  const [isRejected, setIsRejected] = useState(item.rejected);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const handleAuthenticate = async () => {
    await authenticateSitter(
      "organizations",
      item.uid,
      setSnackbarVisible,
      setSnackbarMessage,
      setSnackbarColor
    );
    setIsAuthenticated(true);
    setIsRejected(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(
      "organizations",
      item.uid,
      setSnackbarVisible,
      setSnackbarMessage,
      setSnackbarColor
    );
  };

  const handleRejectAuth = async () => {
    await rejectAuthentication(
      "organizations",
      item.uid,
      setSnackbarVisible,
      setSnackbarMessage,
      setSnackbarColor
    );
    setIsRejected(true);
  };

  const authStatusPending =
    !isAuthenticated && (isRejected === undefined || isRejected === null);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Logo & Name */}
      <ProfileHeader
        name={item.info.name}
        img={item.branding.organizationLogo.cdnUrl}
        description={item.branding.description}
        pets={item.info.petTypes}
      />

      {/* Authenticated badge */}
      {isAuthenticated && (
        <Chip
          icon="check"
          style={{
            backgroundColor: "#d4edda",
            alignSelf: "center",
            marginBottom: 16,
          }}
          textStyle={{ color: "#155724" }}
        >
          Authenticated
        </Chip>
      )}

      {/* Rejection badge */}
      {isRejected && (
        <Chip
          icon="close"
          style={{
            backgroundColor: "#f8d7da", // light red background
            alignSelf: "center",
            marginBottom: 16,
          }}
          textStyle={{ color: "#721c24" }} // dark red text
        >
          Rejected
        </Chip>
      )}

      {/* Pending badge */}
      {authStatusPending && (
        <Chip
          icon="clock-outline"
          style={{
            backgroundColor: "#fff3cd", // light yellow background
            alignSelf: "center",
            marginBottom: 16,
          }}
          textStyle={{ color: "#856404" }} // dark yellow/brown text
        >
          Pending
        </Chip>
      )}

      <Divider />

      {/* Contact Info */}
      <ContactInfoCard
        phoneNumber={item.contact.phoneNumber}
        email={item.info.email}
        website={item.info.website}
        street={item.contact.street}
        district={item.contact.district}
        city={item.contact.city}
        postlCode={item.contact.postlCode}
      />
      <Divider />

      {/* Banking Info */}
      <BankingInfoCard
        bankName={item.banking.bankName}
        bankRoutingNumber={item.banking.bankRoutingNumber}
        iban={item.banking.iban}
        accountHolderName={item.banking.accountHolderName}
        accountNumber={item.banking.accountNumber}
      />
      <Divider />

      {/* Documents */}
      <DocumentInfoCard
        businessLicense={item.documents.businessLicense.cdnUrl}
        insuranceCertificate={item.documents.insuranceCertificate.cdnUrl}
        taxId={item.documents.taxId.cdnUrl}
      />
      <Divider />

      {/* Gallery */}
      <GallerySection images={item.gallery} />

      {/* Authentication actions */}
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
            textColor={"#be5985"}
            style={{ flex: 1, borderColor: "#be5985" }}
            onPress={handleRejectAuth}
          >
            Reject
          </Button>
        </View>
      )}

      {/* Other actions */}
      {isAuthenticated && (
        <Button
          mode="contained"
          style={{ flex: 1, backgroundColor: "#e7000b" }}
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
        style={{ backgroundColor: `${snackbarColor}` }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

export default OrginizationScreen;
