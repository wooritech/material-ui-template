import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import PanelCard from '~/components/PanelCard';
import ListProjectMembers from '~/components/ListProjectMembers';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <PanelCard headerTitle="멤버 관리" showHeaderDivider paddingNone>
        <ListProjectMembers />
      </PanelCard>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
