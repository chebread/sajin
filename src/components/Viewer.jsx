import { db, doc, getDoc } from 'components/firestore';
import { useEffect, useState } from 'react';

const Viewer = ({ refName }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      console.log(refName);
      const docSnap = await getDoc(doc(db, 'images', refName));
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const data = docSnap.data();
        setData(data);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })();
  }, []);

  // console.log(data);
  return (
    <>
      <img src={data.url} /> // 이미지
    </>
  );
};

export default Viewer;
