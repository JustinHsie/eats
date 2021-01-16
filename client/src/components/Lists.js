import { Card } from 'primereact/card';
import { useHistory } from 'react-router-dom';
import { lists as fakeLists } from '../fakeData/lists';
import '../styles/Lists.css';

export const Lists = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/lists/3');
  };

  const makeCards = lists => {
    const cards = lists.map(list => {
      return (
        <div onClick={handleClick} key={list.code}>
          <Card
            className="p-m-2 card__min_width p-link card__background_color"
            title={list.name}
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
      {makeCards(fakeLists)}
    </div>
  );
};
