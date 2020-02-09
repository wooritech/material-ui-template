import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import PanelCard from '~/components/PanelCard';
import FormProjectStyles from '~/components/FormProjectStyles';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <PanelCard headerTitle="스타일 관리" showHeaderDivider>
        <FormProjectStyles />
      </PanelCard>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
