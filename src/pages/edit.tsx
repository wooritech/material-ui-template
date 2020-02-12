import { NextPage } from 'next';
import EditDocument from '~/components/PanelEdit';
import LayoutEdit from '~/layouts/LayoutEdit';

const EditPage: NextPage = () => {
  return (
    <LayoutEdit pageTitle="">
      <EditDocument />
    </LayoutEdit>
  );
};

export default EditPage;
