import React from "react";
import "./App.css";
import { geolocated } from "react-geolocated";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
const DEFAULT_LATITUDE = 48;
const DEFUALT_LANGITUDE = -123;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lat: "",
      lon: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    // console.log(event)
    const target = event.target;
    // console.log(target)
    const value = target.value;

    const name = target.name;
    // console.log(name)

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log("Information: " + JSON.stringify(this.state));

    event.preventDefault();
  }

  render() {
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LATITUDE;
    const longitude = this.props.coords
      ? this.props.coords.longitude
      : DEFUALT_LANGITUDE;

    return (
      <Map center={[latitude, longitude]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!this.props.coords && <div> Loading ...</div>}
        {this.props.coords && (
          <Marker position={[latitude, longitude]}>
            <Popup>
              {/* <Form */}
              <div className="row row-content">
                <div className="col-12">
                  <h1>You are here!</h1>
                  <h6>Send us your Location</h6>
                </div>
                <div className="col-12 col-md-9">
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2} lg={6}>
                        Your Name{" "}
                      </Label>
                      <Col md={10} lg={12}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="lat" md={2} lg={4}>
                        Latitude{" "}
                      </Label>
                      <Col md={10} lg={12}>
                        <Input
                          type="text"
                          id="lat"
                          name="lat"
                          placeholder="Latitude"
                          value={this.state.lat}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="lon" md={2} lg={4}>
                        Longitude{" "}
                      </Label>
                      <Col md={10} lg={12}>
                        <Input
                          type="text"
                          id="lon"
                          name="lon"
                          placeholder="Longitude"
                          value={this.state.lon}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <Button color="primary" value="Submit">
                      {" "}
                      Send
                    </Button>
                  </Form>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(App);
