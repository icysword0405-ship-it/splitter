import {
  useState,
  type FormEvent,
} from 'react';

import { ArrowLeft } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import './CreateGroup.css';

const CreateGroup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [type, setType] =
    useState<'trip' | 'festival'>('trip');

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({
      name,
      type,
    });

    navigate('/groups');
  };

  return (
    <main className="create-group-page">
      <header className="create-group-page__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Create Group</h1>
      </header>

      <form
        className="create-group-form"
        onSubmit={handleSubmit}
      >
        <div className="create-group-form__field">
          <label htmlFor="group-name">
            Group Name
          </label>

          <input
            id="group-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Goa Trip 2026"
            required
          />
        </div>

        <div className="create-group-form__field">
          <span className="create-group-form__label">
            Group Type
          </span>

          <div className="create-group-types">
            <label className="create-group-type">
              <input
                type="radio"
                name="groupType"
                value="trip"
                checked={type === 'trip'}
                onChange={() =>
                  setType('trip')
                }
              />

              <span>Trip</span>
            </label>

            <label className="create-group-type">
              <input
                type="radio"
                name="groupType"
                value="festival"
                checked={type === 'festival'}
                onChange={() =>
                  setType('festival')
                }
              />

              <span>Festival</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="create-group-form__submit"
        >
          Create Group
        </button>
      </form>
    </main>
  );
};

export default CreateGroup;