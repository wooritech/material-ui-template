import { NextPage } from 'next';
import CardPanel from '~/components/CardPanel';
import FormProfile from '~/components/FormProfile';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="계정 설정">
      <CardPanel headerTitle="사용자 계정 정보">
        <FormProfile />
      </CardPanel>
    </LayoutMain>
  );
};

export default ProfilesPage;
