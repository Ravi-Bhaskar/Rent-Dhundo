import React, { useRef, useState, useEffect, useContext } from "react";
import "../styles/rent-details.css";
import ContactOwner from "../components/Contact-Owner/ContactOwner";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";

//images
import CityImg from "../assets/images/city.png";
import BedImg from "../assets/images/bed.png";
import BathImg from "../assets/images/bathtub.png";
import BuildingImg from "../assets/images/building.png";
import AreaImg from "../assets/images/area.png";
import AvailableForImg from "../assets/images/group.png";
import loadingGif from "../assets/images/loading.gif";

import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";

const RentDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [rentRating, setRentRating] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // fetch data from database
  const { data: rent, loading, error } = useFetch(`${BASE_URL}/rents/${id}`);

  //destructure properties from rent object
  const {
    currentOwner,
    desc,
    price,
    reviews,
    city,
    address,
    bed,
    bath,
    area,
    availableFor,
    propertyType,
    photo01,
    photo02,
    photo03,
  } = rent;

  //for images to click and show
  const [previewImg, setPreviewImg] = useState(rent.photo01);

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  //submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please Sign In");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: rentRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    setPreviewImg(`/rent-images/${photo01}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rent]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rent]);

  // for popup contact owner details
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    if (!user || user === undefined || user === null) {
      alert("Please Sign In");
      return navigate("/login");
    }
    togglePopup();
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <section>
        <Container>
          {loading && (
            <>
              <img src={loadingGif} className="loading" alt="loading..." />
              <h4 className="text-center pt-5">Loading.....Please Wait</h4>
            </>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="rent__content">
                  <img src={previewImg} alt="" />
                  <Col lg="5" md="2">
                    <div className="rent__images d-flex gap-4">
                      <div
                        className="img__item"
                        onClick={() => setPreviewImg(`/rent-images/${photo01}`)}
                      >
                        <img
                          src={`/rent-images/${photo01}`}
                          alt=""
                          className="secondary-rent__images"
                        />
                      </div>
                      <div
                        className="img__item"
                        onClick={() => setPreviewImg(`/rent-images/${photo02}`)}
                      >
                        <img
                          src={`/rent-images/${photo02}`}
                          alt=""
                          className="secondary-rent__images"
                        />
                      </div>
                      <div
                        className="img__item"
                        onClick={() => setPreviewImg(`/rent-images/${photo03}`)}
                      >
                        <img
                          src={`/rent-images/${photo03}`}
                          alt=""
                          className="secondary-rent__images"
                        />
                      </div>
                    </div>
                  </Col>

                  <div className="rent__info">
                    <h2>
                      {bed} BHK House For rent in {city}
                    </h2>
                    <div className="price__tag">
                      <h5>
                        <span>{"\u20B9 "}</span>
                        {price}
                      </h5>
                    </div>

                    <div className="rent-detail-rating__container d-flex gap-3">
                      <span className="rent-detail__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "#D5AB55" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span className="d-flex align-items-center gap-1">
                        <i class="ri-map-pin-line"></i> Address - {address}
                      </span>
                    </div>

                    <div className="view-contact__button align-items-center">
                      <button
                        onClick={handleToggle}
                        className="view_contact__btn"
                      >
                        View Contact
                      </button>
                    </div>

                    {popup && (
                      <div className="popup">
                        <div onClick={togglePopup} className="overlay"></div>
                        <div className="popup-content">
                          <div className="owner-details__container">
                            <h3>Owner Details</h3>
                            <img src={avatar} alt="" />
                            <p>Name : {currentOwner?.username}</p>
                            <p>Email : {currentOwner?.email}</p>
                          </div>
                          <div className="close-btn">
                            <button
                              className="close-popup"
                              onClick={togglePopup}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="rent-detail__heading">
                      <h5>Overview</h5>
                    </div>
                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={CityImg} alt="city-img" />
                        <p>{city}</p>
                      </span>
                      <hr />
                      <span>
                        <img className="icons" src={BedImg} alt="bed-img" />{" "}
                        <p>{bed} bedroom</p>
                      </span>
                    </div>

                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={BathImg} alt="bed-img" />{" "}
                        <p>{bath} bathroom</p>
                      </span>
                      <hr />
                      <span>
                        <img
                          className="icons"
                          src={BuildingImg}
                          alt="bed-img"
                        />{" "}
                        <p>{propertyType}</p>
                      </span>
                    </div>

                    <div className="rent__extra-details">
                      <span>
                        <img className="icons" src={AreaImg} alt="bed-img" />{" "}
                        <p>{area} sq.ft.</p>
                      </span>
                      <hr />
                      <span>
                        <img
                          className="icons"
                          src={AvailableForImg}
                          alt="bed-img"
                        />{" "}
                        <p>Available for {availableFor}</p>
                      </span>
                    </div>
                    <div className="rent-detail__heading">
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>
                  </div>

                  {/* --------- rent reviews section --------- */}
                  <div className="rent__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setRentRating(1)}>
                          1 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(2)}>
                          2 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(3)}>
                          3 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(4)}>
                          4 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setRentRating(5)}>
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i class="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* --------- rent reviews section end --------- */}
                </div>
              </Col>

              <Col lg="4" key={rent._id}>
                <ContactOwner rent={rent} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default RentDetails;
