import { db, storage } from './firebase';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const CONTENT_COLLECTION = 'content';
const REVIEWS_COLLECTION = 'reviews';
const CONTENT_PER_PAGE = 10;

export const submitContent = async (contentData, attachments = []) => {
  try {
    const attachmentUrls = [];

    // Upload attachments if any
    for (const file of attachments) {
      const storageRef = ref(storage, `content-attachments/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      attachmentUrls.push(url);
    }

    const docRef = await addDoc(collection(db, CONTENT_COLLECTION), {
      ...contentData,
      attachments: attachmentUrls,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (contentId, contentData, newAttachments = []) => {
  try {
    const contentRef = doc(db, CONTENT_COLLECTION, contentId);
    const contentDoc = await getDoc(contentRef);

    if (!contentDoc.exists()) {
      throw new Error('Content not found');
    }

    const currentAttachments = contentDoc.data().attachments || [];
    const attachmentUrls = [...currentAttachments];

    // Upload new attachments if any
    for (const file of newAttachments) {
      const storageRef = ref(storage, `content-attachments/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      attachmentUrls.push(url);
    }

    await updateDoc(contentRef, {
      ...contentData,
      attachments: attachmentUrls,
      updatedAt: new Date().toISOString()
    });

    return contentId;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (contentId) => {
  try {
    const contentRef = doc(db, CONTENT_COLLECTION, contentId);
    const contentDoc = await getDoc(contentRef);

    if (!contentDoc.exists()) {
      throw new Error('Content not found');
    }

    // Delete attachments if any
    const attachments = contentDoc.data().attachments || [];
    for (const url of attachments) {
      const attachmentRef = ref(storage, url);
      await deleteObject(attachmentRef);
    }

    await deleteDoc(contentRef);
  } catch (error) {
    throw error;
  }
};

export const getContent = async (contentId) => {
  try {
    const contentRef = doc(db, CONTENT_COLLECTION, contentId);
    const contentDoc = await getDoc(contentRef);

    if (!contentDoc.exists()) {
      throw new Error('Content not found');
    }

    return {
      id: contentDoc.id,
      ...contentDoc.data()
    };
  } catch (error) {
    throw error;
  }
};

export const getContentByStatus = async (status, lastDoc = null) => {
  try {
    let q = query(
      collection(db, CONTENT_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(CONTENT_PER_PAGE)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    const content = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      content,
      lastDoc: lastVisible
    };
  } catch (error) {
    throw error;
  }
};

export const submitReview = async (contentId, reviewData) => {
  try {
    const contentRef = doc(db, CONTENT_COLLECTION, contentId);
    const contentDoc = await getDoc(contentRef);

    if (!contentDoc.exists()) {
      throw new Error('Content not found');
    }

    const reviewRef = await addDoc(collection(db, REVIEWS_COLLECTION), {
      contentId,
      ...reviewData,
      createdAt: new Date().toISOString()
    });

    // Update content status based on review decision
    await updateDoc(contentRef, {
      status: reviewData.decision,
      updatedAt: new Date().toISOString()
    });

    return reviewRef.id;
  } catch (error) {
    throw error;
  }
};

export const getContentReviews = async (contentId) => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('contentId', '==', contentId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getContentStats = async (userId) => {
  try {
    const q = query(collection(db, CONTENT_COLLECTION), where('authorId', '==', userId));
    const querySnapshot = await getDocs(q);

    const stats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    };

    querySnapshot.docs.forEach((doc) => {
      const status = doc.data().status;
      stats.total++;
      stats[status]++;
    });

    return stats;
  } catch (error) {
    throw error;
  }
};
