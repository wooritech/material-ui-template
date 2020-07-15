import { NextPage } from 'next';
import None from '~/components/None';
import LandingLayout from '~/layouts/LandingLayout';

interface LandingPageProps { }

const LandingPage: NextPage<LandingPageProps> = () => {
  return (
    <LandingLayout>
      <None />
    </LandingLayout>
  );
};

export default LandingPage;
