import { NextPage } from 'next';
import PanelCard from '~/components/PanelCard';
import ListProject from '~/components/ListProject';
import LayoutMain from '~/layouts/LayoutMain';

const ProjectsPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="내 프로젝트">
      <PanelCard headerTitle="프로젝트 목록" paddingNone>
        <ListProject />
      </PanelCard>
    </LayoutMain>
  );
};

export default ProjectsPage;
