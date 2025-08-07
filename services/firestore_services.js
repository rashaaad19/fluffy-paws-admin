import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
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

