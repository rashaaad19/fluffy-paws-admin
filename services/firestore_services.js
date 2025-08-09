import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
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


export const authenticateSitter = async (collectionName, uid, setSnackbarVisible, setSnackbarMessage, setSnackbarColor, setSnackTextColor) => {

    try {
        const itemRef = doc(db, collectionName, uid);
        await updateDoc(itemRef, {
            isAuthenticated: true,
        });

        setSnackbarMessage("Account is now authenticated!");
        setSnackbarColor("#d4edda");
        setSnackTextColor('#155724 ')

        setSnackbarVisible(true);
    } catch (error) {
        console.error("Error updating document:", error);
        setSnackbarMessage("Failed to update authentication.");
        setSnackbarColor("#f8d7da");
        setSnackTextColor('#721c24  ')

        setSnackbarVisible(true);
    }

}

export const rejectAuthentication = async (collectionName, uid, setSnackbarVisible, setSnackbarMessage, setSnackbarColor, setSnackTextColor) => {
    try {
        const docRef = doc(db, collectionName, uid);

        await updateDoc(docRef, { rejected: true });

        setSnackbarMessage("Authentication request rejected successfully.");
        setSnackbarColor('#fff3cd')
        setSnackTextColor('#856404  ')
        setSnackbarVisible(true);

    } catch (error) {
        console.error("Error rejecting authentication:", error);
        setSnackbarMessage("Failed to reject authentication. Please try again.");
        setSnackbarColor("#f8d7da");
        setSnackTextColor('#721c24  ')

        setSnackbarVisible(true);
    }
};

export const deleteAccount = async (collectionName, uid, setSnackbarVisible, setSnackbarMessage, setSnackbarColor, setSnackTextColor) => {
    try {
        await deleteDoc(doc(db, collectionName, uid));
        setSnackbarMessage("Account is deleted!");
        setSnackbarColor('#d4edda')
        setSnackTextColor('#155724 ')
        setSnackbarVisible(true);


    } catch (error) {
        console.error("Error deleting account:", error);
        setSnackbarMessage("Failed to delete account.");
        setSnackbarColor("#f8d7da");
        setSnackTextColor('#721c24  ')
        setSnackbarVisible(true);
    }
};
