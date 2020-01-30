import { NextPage } from 'next';
import None from '~/components/None';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="계정 설정">
      <None />
    </LayoutMain>
  );
};

export default ProfilesPage;
