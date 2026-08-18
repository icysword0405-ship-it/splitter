import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './CreateGroup.css';

const CreateGroup = () => {
  const navigate = useNavigate();

  return (
    <main className="create-group-page">
      <div className="create-group-page__header">
        <button
          type="button"
          className="create-group-page__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="create-group-page__title">
          Create Group
        </h1>
      </div>

      <form className="create-group-form">
        <div className="create-group-form__field">
          <label htmlFor="group-name">
            Group Name
          </label>

          <input
            id="group-name"
            type="text"
            placeholder="e.g. Goa Trip 2026"
          />
        </div>

        <div className="create-group-form__field">
          <label>
            Group Type
          </label>

          <div className="create-group-types">
            <label className="create-group-type">
              <input
                type="radio"
                name="groupType"
                value="trip"
                defaultChecked
              />

              <span>Trip</span>
            </label>

            <label className="create-group-type">
              <input
                type="radio"
                name="groupType"
                value="festival"
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