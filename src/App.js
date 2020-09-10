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
      submit: false,
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(lat, long) {
    this.setState({
      lat: lat,
      lon: long,
      submit: !this.state.submit,
    });
  }
  toggleSubmit = () => {
    this.setState({
      submit: !this.state.submit,
    });
  };

  componentDidUpdate() {
    if (this.state.submit)
      console.log("Information: " + JSON.stringify(this.state));
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
            {!this.state.submit ? (
              <Popup>
                {/* <Form */}
                <div className="row row-content">
                  <div className="col-12">
                    <h1>You are here! </h1>
                    <p>
                      Latitude : {latitude}
                      <br />
                      Longitude : {longitude}
                    </p>
                    <h3>Send us your Location</h3>
                  </div>
                  <div className="col-12 col-md-9">
                    <Form>
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
                            onChange={(e) => {
                              this.setState({
                                name: e.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>

                      <Button
                        className="offset-5"
                        color="primary"
                        value="submit"
                        onClick={() => this.updateState(latitude, longitude)}
                      >
                        {" "}
                        Send
                      </Button>
                    </Form>
                  </div>
                </div>
              </Popup>
            ) : (
              <Popup className="thank">
                <h3> Sent successfully !</h3>
                <h1> Thank you!</h1>

                {this.toggleSubmit}
              </Popup>
            )}
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
