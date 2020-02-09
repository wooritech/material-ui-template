import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import CardPanel from '~/components/CardPanel';
import ListDocumentVersions from '~/components/ListDocumentVersions';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <CardPanel headerTitle="문서 버전 목록" showHeaderDivider paddingNone>
        <ListDocumentVersions />
      </CardPanel>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
