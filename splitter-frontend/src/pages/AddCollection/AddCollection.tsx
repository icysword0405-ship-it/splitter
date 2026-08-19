import { useState, type FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { groups } from '../../data/mockData';

import './AddCollection.css';

const AddCollection = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const group = groups.find(
    (item) => item.id === groupId,
  );

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (!group) {
    return (
      <main className="add-collection">
        <h1>Group not found</h1>
      </main>
    );
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const collectionData = {
      groupId,
      type: 'collection',
      amount: Number(amount),
      description:
        description || 'Public collection',
    };

    console.log(
      'Collection:',
      collectionData,
    );

    navigate(`/groups/${groupId}`);
  };

  return (
    <main className="add-collection">
      <header className="add-collection__header">
        <button
          type="button"
          className="add-collection__back"
          onClick={() => navigate(`/groups/${group.id}`)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Add Collection</h1>
      </header>

      <form
        className="add-collection__form"
        onSubmit={handleSubmit}
      >
        <div className="add-collection__field">
          <label htmlFor="collection-amount">
            Collection Amount
          </label>

          <div className="add-collection__amount">
            <span>₹</span>

            <input
              id="collection-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="add-collection__field">
          <label htmlFor="collection-description">
            Description
          </label>

          <input
            id="collection-description"
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="e.g. Today's collection"
          />
        </div>

        <button
          type="submit"
          className="add-collection__submit"
        >
          Save Collection
        </button>
      </form>
    </main>
  );
};

export default AddCollection;