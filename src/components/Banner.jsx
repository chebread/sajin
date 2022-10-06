import isPushFileState from 'components/isPushFileState';
import { isCopyFileState } from 'components/states';
import { useRecoilValue } from 'recoil';

const Banner = () => {
  const isPushFile = isPushFileState();
  const isCopyFile = useRecoilValue(isCopyFileState);
  // isPushFile: true / isCopyFile: false 인 경우만 경고
  // isPushFile: false는 그냥 pass
  console.log(isPushFile, isCopyFile);
  // banner는 그저 아래에 위치 하지만 css로 위로 올려야 함!
  return isPushFile ? isCopyFile ? '' : <h1>Banner</h1> : '';
};

export default Banner;
