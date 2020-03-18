import React from 'react';
import { NextPage } from 'next';
import EditLayout from '~/layouts/EditLayout';
import EditorPanel from '~/components/EditorPanel';

const EditPage: NextPage = () => {
  const [nodeId, setNodeId] = React.useState('');

  const handleOnTreeNodeClick = (id: string) => {
    setNodeId(id);
  };

  return (
    <EditLayout pageTitle="" onTreeNodeClick={handleOnTreeNodeClick}>
      <EditorPanel />
    </EditLayout>
  );
};

export default EditPage;
