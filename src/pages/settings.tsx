import { NextPage } from 'next';
import PanelCard from '~/modules/components/CardTypePanel';
import SystemSettingsAdminList from '~/components/SystemSettingsAdminList';
import MainLayout from '~/layouts/MainLayout';

const SettingsPage: NextPage = () => {
  return (
    <MainLayout pageTitle="시스템 설정">
      <PanelCard headerTitle="관리자 목록" showHeaderDivider paddingNone>
        <SystemSettingsAdminList />
      </PanelCard>
    </MainLayout>
  );
};

export default SettingsPage;
