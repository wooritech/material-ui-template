import { NextPage } from 'next';
import CardPanel from '~/components/CardPanel';
import ListProject from '~/components/ListProject';
import LayoutMain from '~/layouts/LayoutMain';

const ProjectsPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="내 프로젝트">
      <CardPanel headerTitle="프로젝트 목록" paddingNone>
        <ListProject />
      </CardPanel>
    </LayoutMain>
  );
};

export default ProjectsPage;
