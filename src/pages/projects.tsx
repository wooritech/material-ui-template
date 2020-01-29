import { NextPage } from 'next';
import None from '~/components/None';
import LayoutMain from '~/layouts/LayoutMain';

const ProjectsPage: NextPage = () => {
  return (
    <LayoutMain pageTitle="내 프로젝트">
      <None />
    </LayoutMain>
  );
};

export default ProjectsPage;
