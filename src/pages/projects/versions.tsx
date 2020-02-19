import { NextPage } from 'next';
import ProjectSettingsLayout from '~/layouts/ProjectSettingsLayout';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectSettingsVersionList from '~/components/ProjectSettingsVersionList';

const ProjectSettingsVersionsPage: NextPage = () => {
  return (
    <ProjectSettingsLayout pageTitle="프로젝트 설정">
      <PanelCard headerTitle="문서 버전 목록" showHeaderDivider paddingNone>
        <ProjectSettingsVersionList />
      </PanelCard>
    </ProjectSettingsLayout>
  );
};

export default ProjectSettingsVersionsPage;
