import { NextPage } from 'next';
import CardPanel from '~/components/CardPanel';
import ListAdmin from '~/components/ListAdmin';
import LayoutMain from '~/layouts/LayoutMain';

const SettingsPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="시스템 설정">
      <CardPanel headerTitle="관리자 목록" showHeaderDivider paddingNone>
        <ListAdmin />
      </CardPanel>
    </LayoutMain>
  );
};

export default SettingsPage;
