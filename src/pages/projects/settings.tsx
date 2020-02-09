import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import CardPanel from '~/components/CardPanel';
import FormProjectSettings from '~/components/FormProjectSettings';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <CardPanel headerTitle="코드 편집기 설정" showHeaderDivider>
        <FormProjectSettings />
      </CardPanel>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
