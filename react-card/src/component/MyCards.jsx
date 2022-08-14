import { useState } from "react";
import { getAll, deleteCard, updateCard } from "../services/cardsService";
import PageHeader from "../common/PageHeader";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyCards() {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  //   async function getCards() {
  //     const { data } = await cardsService.getAll();
  //     setCards(data);
  //   }
  const editCard = async (id, values) => {
    await updateCard(id, values);
    setRefresh(!refresh);
  };
  const removeCard = async (id) => {
    await deleteCard(id);

    setRefresh(!refresh);
  };
  useEffect(() => {
    getAll().then((res) => setCards(res.data));
  }, [refresh]);
  return (
    <>
      {" "}
      <PageHeader
        title="All My Cards"
        discription="here you see all of your cards"
      ></PageHeader>
      <div className="row">
        <Link to="/my-cards/create-card">
          <i className="bi bi-plus-lg"></i> New Card
        </Link>
      </div>
      <div className="row">
        {!cards.length ? (
          <p>no cards...</p>
        ) : (
          <div className="container d-flex row">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                removeCard={removeCard}
                editCard={editCard}
              />
            ))}{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default MyCards;
