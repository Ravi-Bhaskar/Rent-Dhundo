import React, { useEffect, useState, useContext } from "react";
import { Container, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

import "../styles/rent-property.css";

import postPropertyImg from "../assets/images/post-property.jpg";
import tickMarkImg from "../assets/images/check-mark.png";

const RentProperty = () => {

  const [image01, setImage01] = useState(null);
  const [image02, setImage02] = useState(null);
  const [image03, setImage03] = useState(null);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bed, setBed] = useState(null);
  const [bath, setBath] = useState(null);
  const [price, setPrice] = useState(null);
  const [area, setArea] = useState(null);
  const [availableFor, setAvailableFor] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo01", image01);
    formData.append("photo02", image02);
    formData.append("photo03", image03);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("propertyType", propertyType);
    formData.append("bed", bed);
    formData.append("bath", bath);
    formData.append("price", price);
    formData.append("area", area);
    formData.append("availableFor", availableFor);
    formData.append("desc", desc);

    try {
      if (!user || user === undefined || user === null) {
        alert("Please Sign In");
        return navigate("/login");
      }

      const res = await fetch(`${BASE_URL}/rents`, {
        method: "POST",
        credentials: "include",
        body: formData,
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <Container className="post-property__section">
          <div className="post-property__container">
            <div className="post-property__img">
              <img src={postPropertyImg} alt="" />
            </div>
            <div className="post-property__details">
              <h2>
                Post Property Ad to Rent Online for<span> Free!</span>
              </h2>
              <div class="rent-detail__list">
                <div class="detail__list">
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>List Property on Rent Dhundo Directly</p>
                </div>
                <div class="detail__list">
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>List Unlimited Property as You Want</p>
                </div>
                <div class="detail__list">
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>Get Unlimited enquiries</p>
                </div>
                <div class="detail__list">
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>Get Better Exposure To Potential Tenants</p>
                </div>
                <div class="detail__list">
                  <img src={tickMarkImg} alt="tickImg" />
                  <p>Negotiate directly without any mediator</p>
                </div>
              </div>
            </div>
          </div>

          <div className="upload-property__form">
            <h3>Upload Listing</h3>
            <hr />

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>City </label>
                <input
                  type="text"
                  placeholder="City"
                  required
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Address </label>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Property Type </label>
                <input
                  type="text"
                  placeholder="Property Type"
                  required
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Bed </label>
                <input
                  type="number"
                  placeholder="Bed"
                  required
                  id="bed"
                  value={bed}
                  onChange={(e) => setBed(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Bath </label>
                <input
                  type="number"
                  placeholder="Bath"
                  required
                  id="bath"
                  value={bath}
                  onChange={(e) => setBath(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Cost </label>
                <input
                  type="number"
                  placeholder="Price"
                  required
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Built Up Area </label>
                <input
                  type="number"
                  placeholder="Area in sq.ft."
                  required
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Available For </label>
                <input
                  type="text"
                  placeholder="Available For?"
                  required
                  id="availableFor"
                  value={availableFor}
                  onChange={(e) => setAvailableFor(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label>Description </label>
                <textarea
                  type="text"
                  placeholder="Description"
                  required
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="file">Choose Property Image </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setImage01(e.target.files[0])}
                  accept="image/*"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="file"
                  required
                  onChange={(e) => setImage02(e.target.files[0])}
                  accept="image/*"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="file"
                  required
                  onChange={(e) => setImage03(e.target.files[0])}
                  accept="image/*"
                />
              </FormGroup>
              <Button className="btn create-property__btn auth__btn" type="submit">
                Create Property
              </Button>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default RentProperty;
