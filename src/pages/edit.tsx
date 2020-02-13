import { NextPage } from 'next';
import PanelEdit from '~/components/PanelEdit';
import LayoutEdit from '~/layouts/LayoutEdit';

const EditPage: NextPage = () => {
  return (
    <LayoutEdit pageTitle="">
      <PanelEdit />
    </LayoutEdit>
  );
};

export default EditPage;
