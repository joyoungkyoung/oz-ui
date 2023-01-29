import { ReactComponent as LogoIcon } from '@assets/images/logo.svg';
import { COLORS } from '@assets/styles/variable';

const Logo = () => {
  return <LogoIcon className="logo-icon" fill={COLORS.primaryColor} height={'100%'} />;
};

export default Logo;
