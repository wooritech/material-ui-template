import { NextPage } from 'next';
import ProjectSettingsLayout from '~/layouts/ProjectSettingsLayout';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectSettingsCodeEditorForm from '~/components/ProjectSettingsCodeEditorForm';

const ProjectSettingsCodeEditorPage: NextPage = () => {
  return (
    <ProjectSettingsLayout pageTitle="프로젝트 설정">
      <PanelCard headerTitle="코드 편집기 설정" showHeaderDivider>
        <ProjectSettingsCodeEditorForm />
      </PanelCard>
    </ProjectSettingsLayout>
  );
};

export default ProjectSettingsCodeEditorPage;
