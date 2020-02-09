import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import CardPanel from '~/components/CardPanel';
import ListProjectMembers from '~/components/ListProjectMembers';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <CardPanel headerTitle="멤버 관리" showHeaderDivider paddingNone>
        <ListProjectMembers />
      </CardPanel>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
