import { NextPage } from 'next';
import PanelCard from '~/components/PanelCard';
import FormProfile from '~/components/FormProfile';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="계정 설정">
      <PanelCard headerTitle="사용자 계정 정보">
        <FormProfile />
      </PanelCard>
    </LayoutMain>
  );
};

export default ProfilesPage;
