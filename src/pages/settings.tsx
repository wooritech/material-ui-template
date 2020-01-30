import { NextPage } from 'next';
import None from '~/components/None';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="시스템 설정">
      <None />
    </LayoutMain>
  );
};

export default ProfilesPage;
