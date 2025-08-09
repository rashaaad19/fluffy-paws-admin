import { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Button, Divider, Portal, Snackbar, Text } from "react-native-paper";
import ProfileHeader from "../../components/ProfileHeader";
import ContactInfoCard from "../../components/ContactInfoCard";
import GallerySection from "../../components/GallerySection";
import {
  authenticateSitter,
  deleteAccount,
  rejectAuthentication,
} from "../../services/firestore_services";
import StatusChip from "../../components/StatusChip";
import BankingInfoCard from "./components/BankingInfoCard";
import DocumentInfoCard from "./components/DocumentInfoCard";

const OrginizationScreen = ({ route }) => {
  const { item } = route.params;

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

  const handleAuthenticate = async () => {
    try {
      setLoadingAuthenticate(true);
      await authenticateSitter(
        "organizations",
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
        "organizations",
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
        "organizations",
        item.uid,
        setSnackbarVisible,
        setSnackbarMessage,
        setSnackbarColor,
        setSnackTextColor
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
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
        {/* Logo & Name */}
        <ProfileHeader
          name={item.info.name}
          img={item.branding.organizationLogo.cdnUrl}
          description={item.branding.description}
          pets={item.info.petTypes}
        />

        {/* Authenticated badge */}
        {isAuthenticated && (
          <StatusChip
            backgroundColor={"#d4edda"}
            textColor={"#155724"}
            text={"Authenticated"}
            icon={"check"}
          />
        )}

        {/* Rejection badge */}
        {isRejected && (
          <StatusChip
            backgroundColor={"#f8d7da"}
            textColor={"#721c24"}
            text={"Rejected"}
            icon={"close"}
          />
        )}

        {/* Pending badge */}
        {authStatusPending && (
          <StatusChip
            backgroundColor={"#fff3cd"}
            textColor={"#856404"}
            text={"Pending"}
            icon={"clock-outline"}
          />
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
        {item.gallery && <GallerySection images={item.gallery} />}

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
              loading={loadingAuthenticate}
              disabled={loadingAuthenticate || loadingReject || loadingDelete}
            >
              Authenticate
            </Button>
            <Button
              mode="outlined"
              textColor={"#be5985"}
              style={{ flex: 1, borderColor: "#be5985" }}
              onPress={handleRejectAuth}
              loading={loadingReject}
              disabled={loadingAuthenticate || loadingReject || loadingDelete}
            >
              Reject
            </Button>
          </View>
        )}

        {/* Other actions */}
        {(isAuthenticated || isRejected !== undefined) && (
          <Button
            mode="contained"
            style={{ flex: 1, backgroundColor: "#e7000b" }}
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

export default OrginizationScreen;
