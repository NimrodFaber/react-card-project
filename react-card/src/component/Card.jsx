// import { Link } from "react-router-dom";
import EditCard from "./EditCard";
function Card({ card, removeCard, editCard }) {
  const { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage } = card;
  return (
    <>
      {" "}
      <div
        className="card m-2 p-3"
        style={{ width: "18rem", backgroundColor: "#c3eedb" }}
      >
        <img src={bizImage} className="card-img-top" alt={bizName}></img>
        <div class="card-body">
          <h5 class="card-title">{bizName}</h5>
          <p class="card-text">{bizDescription}</p>

          <ul class="list-group list-group-flush">
            <div className="list-group-item my-1">{bizAddress}</div>
            <div className="list-group-item  mb-2">{bizPhone}</div>
          </ul>

          <button
            type="button"
            className="btn btn-warning mx-2"
            data-bs-toggle="modal"
            data-bs-target="#editmodal"
          >
            edit <i className="bi bi-pencil-fill"></i>
          </button>
          <EditCard card={card} editCard={editCard}></EditCard>

          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            delete <i className="bi bi-trash-fill"></i>
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLabel">
                    delete card!
                  </h3>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>are you sure you want delete this card?</p>
                  <h5>{bizName}</h5>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger   "
                    data-bs-dismiss="modal"
                    onClick={() => {
                      removeCard(_id);
                    }}
                  >
                    delete card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
