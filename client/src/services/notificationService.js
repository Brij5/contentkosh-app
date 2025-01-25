import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  deleteDoc
} from 'firebase/firestore';

const NOTIFICATIONS_COLLECTION = 'notifications';
const NOTIFICATIONS_PER_PAGE = 20;

export const createNotification = async (notification) => {
  try {
    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
      ...notification,
      read: false,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserNotifications = async (userId, lastDoc = null) => {
  try {
    let q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(NOTIFICATIONS_PER_PAGE)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const notifications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      notifications,
      lastDoc: lastVisible
    };
  } catch (error) {
    throw error;
  }
};

export const getUnreadNotificationsCount = async (userId) => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    const notificationDoc = await getDoc(notificationRef);

    if (!notificationDoc.exists()) {
      throw new Error('Notification not found');
    }

    await updateDoc(notificationRef, {
      read: true
    });
  } catch (error) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async (userId) => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map((doc) => updateDoc(doc.ref, { read: true }));

    await Promise.all(updatePromises);
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const notificationRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    const notificationDoc = await getDoc(notificationRef);

    if (!notificationDoc.exists()) {
      throw new Error('Notification not found');
    }

    await deleteDoc(notificationRef);
  } catch (error) {
    throw error;
  }
};

export const deleteAllNotifications = async (userId) => {
  try {
    const q = query(collection(db, NOTIFICATIONS_COLLECTION), where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
  } catch (error) {
    throw error;
  }
};

// Helper function to create different types of notifications
export const createSystemNotification = async (userId, title, message) => {
  return createNotification({
    userId,
    type: 'system',
    title,
    message
  });
};

export const createContentNotification = async (userId, contentId, title, message) => {
  return createNotification({
    userId,
    type: 'content',
    contentId,
    title,
    message
  });
};

export const createReviewNotification = async (userId, contentId, reviewId, title, message) => {
  return createNotification({
    userId,
    type: 'review',
    contentId,
    reviewId,
    title,
    message
  });
};
