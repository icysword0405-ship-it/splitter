import { Plus } from 'lucide-react';

import './CreateGroupButton.css';
import { useNavigate } from 'react-router-dom';

const CreateGroupButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="create-group-button"
      onClick={() => navigate('/groups/create')}
    >
      <Plus size={20} />

      <span>Create New Group</span>
    </button>
  );
};

export default CreateGroupButton;