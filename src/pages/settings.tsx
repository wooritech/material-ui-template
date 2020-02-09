import { NextPage } from 'next';
import PanelCard from '~/components/PanelCard';
import ListAdmin from '~/components/ListAdmin';
import LayoutMain from '~/layouts/LayoutMain';

const SettingsPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="시스템 설정">
      <PanelCard headerTitle="관리자 목록" showHeaderDivider paddingNone>
        <ListAdmin />
      </PanelCard>
    </LayoutMain>
  );
};

export default SettingsPage;
