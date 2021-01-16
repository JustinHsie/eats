import { Card } from 'primereact/card';
import { lists as fakeLists } from '../fakeData/lists';
import '../styles/Lists.css';

export const Lists = () => {
  const makeCards = lists => {
    const cards = lists.map(list => {
      return (
        <Card className="p-m-2 card__min_width p-link card__background_color" title={list.name} key={list.code}>
          {list.category}
        </Card>
      );
    });
    return cards;
  };

  return <div className="p-d-flex p-jc-center p-flex-wrap">{makeCards(fakeLists)}</div>;
};
