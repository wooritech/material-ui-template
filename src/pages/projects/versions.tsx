import { NextPage } from 'next';
import LayoutProjectSettings from '~/layouts/LayoutProjectSettings';
import PanelCard from '~/components/PanelCard';
import ListDocumentVersions from '~/components/ListDocumentVersions';

const ProjectSettingsPage: NextPage = () => {
  return (
    <LayoutProjectSettings pageTitle="프로젝트 설정">
      <PanelCard headerTitle="문서 버전 목록" showHeaderDivider paddingNone>
        <ListDocumentVersions />
      </PanelCard>
    </LayoutProjectSettings>
  );
};

export default ProjectSettingsPage;
