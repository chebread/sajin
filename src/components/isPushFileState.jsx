// 파일이 푸쉬되었는가?
import { useRecoilValue } from 'recoil';
import { dbRefIdState } from 'components/states';

const isPushFileState = () => {
  const dbRefId = useRecoilValue(dbRefIdState);
  const isPushFile = dbRefId != null ? true : false;
  return isPushFile;
};

export default isPushFileState;
