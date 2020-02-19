import { NextPage } from 'next';
import ProjectSettingsLayout from '~/layouts/ProjectSettingsLayout';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectSettingsStylesForm from '~/components/ProjectSettingsStylesForm';

const ProjectSettingsStylesPage: NextPage = () => {
  return (
    <ProjectSettingsLayout pageTitle="프로젝트 설정">
      <PanelCard headerTitle="스타일 관리" showHeaderDivider>
        <ProjectSettingsStylesForm />
      </PanelCard>
    </ProjectSettingsLayout>
  );
};

export default ProjectSettingsStylesPage;
