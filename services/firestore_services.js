import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import {db} from "../firebase"
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
