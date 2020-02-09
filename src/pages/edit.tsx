import { NextPage } from 'next';
import EditDocument from '~/components/PanelEdit';
import LayoutEdit from '~/layouts/LayoutEdit';

const EditPage: NextPage = () => {
  return (
    <LayoutEdit pageTitle="계정 설정">
      <EditDocument />
    </LayoutEdit>
  );
};

export default EditPage;
