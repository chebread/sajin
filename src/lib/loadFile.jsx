import { db, doc, getDoc } from 'lib/firestore';

// data 반환
const loadFile = async ({ fileId }) => {
  const docRef = doc(db, 'images', fileId);
  const docSnap = await getDoc(docRef); // first logic
  if (docSnap.exists()) {
    const data = docSnap.data(); // doc의 data들
    return data;
  } else {
    // console.log(docSnap, fileId);
    return null;
  }
};

export default loadFile;
