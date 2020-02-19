import { NextPage } from 'next';
import ProjectSettingsLayout from '~/layouts/ProjectSettingsLayout';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectSettingsMemberList from '~/components/ProjectSettingsMemberList';

const ProjectSettingsMembersPage: NextPage = () => {
  return (
    <ProjectSettingsLayout pageTitle="프로젝트 설정">
      <PanelCard headerTitle="멤버 관리" showHeaderDivider paddingNone>
        <ProjectSettingsMemberList />
      </PanelCard>
    </ProjectSettingsLayout>
  );
};

export default ProjectSettingsMembersPage;
