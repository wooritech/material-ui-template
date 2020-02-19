import { NextPage } from 'next';
import PanelCard from '~/modules/components/CardTypePanel';
import ProfileForm from '~/components/ProfileForm';
import MainLayout from '~/layouts/MainLayout';

const ProfilesPage: NextPage = () => {
  return (
    <MainLayout pageTitle="계정 설정">
      <PanelCard headerTitle="사용자 계정 정보">
        <ProfileForm />
      </PanelCard>
    </MainLayout>
  );
};

export default ProfilesPage;
