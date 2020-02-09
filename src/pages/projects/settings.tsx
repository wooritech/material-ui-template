import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import PanelCard from '~/components/PanelCard';
import FormProjectSettings from '~/components/FormProjectSettings';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <PanelCard headerTitle="코드 편집기 설정" showHeaderDivider>
        <FormProjectSettings />
      </PanelCard>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
