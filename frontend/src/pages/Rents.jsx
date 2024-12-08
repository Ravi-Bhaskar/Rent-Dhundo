import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/rents.css";
import SearchBar from "../shared/Home SearchBar/SearchBar";
import RentsPageCard from "../shared/RentsPageCard";

import "../shared/rent-card.css";

import FilterImg from "../assets/images/filter.png";
import loadingGif from "../assets/images/loading.gif";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Rents = () => {
  //filter button functionality
  const [show, setShow] = useState(false);

  //page count
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: rents, loading, error } = useFetch(`${BASE_URL}/rents?page=${page}`);
  const { data: rentCount } = useFetch(`${BASE_URL}/rents/search/getRentCount`);

  useEffect(() => {
    const pages = Math.ceil(rentCount / 9);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, rentCount, rents]);

  return (
    <>
      <div>
        {loading && (
          <>
          <img src={loadingGif} className="loading" alt="loading..." />
          <h4 className="text-center pt-5 mt-2 mb-4">Loading.....Please Wait</h4>
          </>
        )}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <div className="rent__section">
            {/* Side Panels */}
            {show && (
              <div className="filter-panel__container">
                <div className="cart__close">
                  <span>
                    <i class="ri-close-fill" onClick={() => setShow(!show)}></i>
                  </span>
                </div>
                <div className="filter-panel__section">
                  <Container>
                    <Row>
                      <SearchBar />
                    </Row>
                  </Container>
                </div>
              </div>
            )}

            {/* List and Empty View */}

            <div className="rent-list__section">
              <Container>
                <Row>
                  <Col lg="12" className="mb-4 mt-3 d-flex">
                    <h2 className="featured__rent-title">All Rents</h2>
                    <button class="filter-btn" onClick={() => setShow(!show)}>
                      <img src={FilterImg} alt=""></img> Filters
                    </button>
                  </Col>

                  {/* RentCard */}
                  {rents?.map((rent) => (
                    <Col lg="4" md="6" sm="6" className="mb-4" key={rent._id}>
                      <RentsPageCard rent={rent} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
            <div>
              <Container>
                <Row>
                  <Col lg="12">
                    <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                      {[...Array(pageCount).keys()].map((number) => (
                        <span
                          key={number}
                          onClick={() => setPage(number)}
                          className={page === number ? "active__page" : ""}
                        >
                          {number + 1}
                        </span>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Rents;
