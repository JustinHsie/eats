import { Card } from 'primereact/card';
import { useHistory } from 'react-router-dom';
import '../styles/Lists.css';
import { database } from '../fakeData/database';

export const Lists = () => {
  const history = useHistory();
  const handleClick = index => {
    history.push(`/lists/${index}`);
  };

  const makeCards = lists => {
    const cards = lists.map((list, index) => {
      return (
        <div onClick={() => handleClick(index)} key={index}>
          <Card
            className="p-m-2 card_min_width p-link card_background_color"
            title={list.title}
          >
            {list.description}
          </Card>
        </div>
      );
    });
    return cards;
  };

  return (
    <div className="p-d-flex p-jc-center p-flex-wrap">
      {makeCards(database.lists.db)}
    </div>
  );
};
