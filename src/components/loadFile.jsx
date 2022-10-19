import { db, doc, getDoc } from 'components/firestore';

// data 반환
const loadFile = async ({ fileId }) => {
  const docSnap = await getDoc(doc(db, 'images', fileId)); // first logic
  if (docSnap.exists()) {
    const data = docSnap.data(); // doc의 data들
    return data;
  } else {
    // console.log(docSnap, fileId);
    return null;
  }
};

export default loadFile;
