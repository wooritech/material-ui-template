import { NextPage } from 'next';
import None from '~/components/None';
import LayoutHome from '~/layouts/LayoutHome';

interface LandingPageProps {}

const LandingPage: NextPage<LandingPageProps> = () => {
  return (
    <LayoutHome>
      <None />
    </LayoutHome>
  );
};

export default LandingPage;
