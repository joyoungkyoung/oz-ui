import Logo from '@Components/Atoms/Logo';
import Progress from '@Components/Atoms/Progress';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  > svg {
    align-self: center;
  }
`;

interface LogoWithProgressProps {
  current: number;
  max: number;
  onLoaded: () => void;
}

const LogoWithProgress = ({ current, max, onLoaded }: LogoWithProgressProps) => {
  return (
    <LogoWrapper className="logo-wrapper">
      <Logo />
      <Progress current={current} max={max} onLoaded={onLoaded} />
    </LogoWrapper>
  );
};

export default LogoWithProgress;
