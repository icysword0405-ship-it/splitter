import { useState, type FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { groups } from '../../data/mockData';

import './AddContribution.css';

const AddContribution = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const group = groups.find(
    (item) => item.id === groupId,
  );

  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (!group) {
    return (
      <main className="transaction-page">
        <h1>Group not found</h1>
      </main>
    );
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const contribution = {
      groupId,
      type: 'contribution',
      memberId,
      amount: Number(amount),
      description:
        description || 'Member contribution',
    };

    console.log('Contribution:', contribution);

    navigate(`/groups/${groupId}`);
  };

  return (
    <main className="transaction-page">
      <header className="transaction-page__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Add Contribution</h1>
      </header>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <div className="transaction-form__field">
          <label htmlFor="member">
            Member
          </label>

          <select
            id="member"
            value={memberId}
            onChange={(event) =>
              setMemberId(event.target.value)
            }
            required
          >
            <option value="">
              Select member
            </option>

            {group.members.map((member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="transaction-form__field">
          <label htmlFor="amount">
            Amount
          </label>

          <div className="transaction-form__amount">
            <span>₹</span>

            <input
              id="amount"
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

        <div className="transaction-form__field">
          <label htmlFor="description">
            Description
          </label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="e.g. Personal contribution"
          />
        </div>

        <button
          type="submit"
          className="transaction-form__submit"
        >
          Save Contribution
        </button>
      </form>
    </main>
  );
};

export default AddContribution;