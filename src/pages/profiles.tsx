import { NextPage } from 'next';
import CardProfile from '~/components/CardProfile';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="계정 설정">
      <CardProfile />
    </LayoutMain>
  );
};

export default ProfilesPage;
