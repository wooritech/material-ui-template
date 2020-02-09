import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import CardPanel from '~/components/CardPanel';
import FormCodeEditorSettings from '~/components/FormCodeEditorSettings';

const CodeEditorSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <CardPanel headerTitle="코드 편집기 설정" showHeaderDivider>
        <FormCodeEditorSettings />
      </CardPanel>
    </LayoutProjectSettings>
  );
};

export default CodeEditorSettingsPage;
