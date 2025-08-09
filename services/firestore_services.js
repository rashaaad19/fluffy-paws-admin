import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

export const getUsers = (callback) => {
    const usersQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(usersQuery, (snapshot) => {
        const usersArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(usersArr);

    });

    return unsub;
};

export const getPersonalSitters = (callback) => {
    const sittersQuery = query(
        collection(db, "personalSitters"),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(sittersQuery, (snapshot) => {
        const sittersArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(sittersArr);

    });

    return unsub;
};


export const getOrganizations = (callback) => {
    const organizationsQuery = query(
        collection(db, "organizations"),
        orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(organizationsQuery, (snapshot) => {
        const organizationsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(organizationsArr);

    });

    return unsub;
};


export const authenticateSitter = async (collectionName, uid, setSnackbarVisible, setSnackbarMessage, setSnackbarColor) => {

    try {
        const itemRef = doc(db, collectionName, uid);
        await updateDoc(itemRef, {
            isAuthenticated: true,
        });

        setSnackbarMessage("Account is now authenticated!");
        setSnackbarColor("#008C1C")
        setSnackbarVisible(true);
    } catch (error) {
        console.error("Error updating document:", error);
        setSnackbarMessage("Failed to update authentication.");
        setSnackbarColor("#e7000b")
        setSnackbarVisible(true);
    }

}

export const rejectAuthentication = async (collectionName, uid, setSnackbarVisible, setSnackbarMessage, setSnackbarColor) => {
    try {
        const docRef = doc(db, collectionName, uid);

        await updateDoc(docRef, { rejected: true });

        setSnackbarMessage("Authentication request rejected successfully.");
        setSnackbarColor('#FF7F50')
        setSnackbarVisible(true);

    } catch (error) {
        console.error("Error rejecting authentication:", error);
        setSnackbarMessage("Failed to reject authentication. Please try again.");
        setSnackbarColor("#e7000b")
        setSnackbarVisible(true);
    }
};

export const deleteAccount = async (uid, collectionName, setSnackbarVisible, setSnackbarMessage, setSnackbarColor) => {
    try {
        await deleteDoc(doc(db, collectionName, uid));
        setSnackbarMessage("Account is deleted!");
        setSnackbarColor('#008C1C')
        setSnackbarVisible(true);


    } catch (error) {
        console.error("Error deleting account:", error);
        setSnackbarMessage("Failed to delete account.");
        setSnackbarColor("#e7000b")
        setSnackbarVisible(true);
    }
};
