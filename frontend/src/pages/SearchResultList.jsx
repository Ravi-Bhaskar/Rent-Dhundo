import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "./../shared/common/CommonSection";

import { useLocation } from "react-router-dom";
import RentCard from "./../shared/RentCard";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommonSection title={"Rent Search Result"} />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4 className="text-center mt-4 mb-4">No Rent Found</h4>
            ) : (
              data?.map((rent) => (
                <Col lg="4" md="6" sm="6" className="mb-4" key={rent._id}>
                  <RentCard rent={rent} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;
