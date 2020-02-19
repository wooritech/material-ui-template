import { NextPage } from 'next';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectList from '~/components/ProjectList';
import MainLayout from '~/layouts/MainLayout';

const ProjectsPage: NextPage = () => {
  return (
    <MainLayout pageTitle="내 프로젝트">
      <PanelCard headerTitle="프로젝트 목록" paddingNone>
        <ProjectList />
      </PanelCard>
    </MainLayout>
  );
};

export default ProjectsPage;
