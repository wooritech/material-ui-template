import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import CardPanel from '~/components/CardPanel';
import FormProjectStyles from '~/components/FormProjectStyles';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <CardPanel headerTitle="스타일 관리" showHeaderDivider>
        <FormProjectStyles />
      </CardPanel>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
