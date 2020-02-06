import { NextPage } from 'next';
import CardPanel from '~/components/CardPanel';
import ListAdmins from '~/components/ListAdmins';
import LayoutMain from '~/layouts/LayoutMain';

const ProfilesPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="시스템 설정">
      <CardPanel headerTitle="관리자 목록">
        <ListAdmins />
      </CardPanel>
    </LayoutMain>
  );
};

export default ProfilesPage;
