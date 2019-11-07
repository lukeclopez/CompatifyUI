import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";
import BioCard from "./bioCard";
import MyReports from "./myReports";
import ArtistsCards from "./artistsCards";

class DisplayProfile extends Component {
  state = { data: {}, currentUser: {}, loading: true, error: "" };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    const refreshToken = sptfy.getRefreshToken();
    if (!refreshToken) {
      this.props.history.push("/login");
      return null;
    }
    const currentUser = await sptfy.getCurrentSpotifyUser(refreshToken);
    try {
      const data = await sptfy.getProfile(currentUser.data.id);
      this.setState({ data, currentUser: currentUser.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ loading: false, error: "Could not find profile!" });
      }
    }
  };

  render() {
    const { data, currentUser, loading, error } = this.state;
    const {
      user_id,
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range,
      genres,
      artists,
      share_url
    } = data;
    const { images } = currentUser;
    const radarData = {
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range
    };

    if (loading) return <Loader message={"Getting profile"} />;

    if (error) return <>{error}</>;

    const center = "d-flex justify-content-center";

    return (
      <>
        <BioCard currentUser={currentUser} data={data} />

        <div className="card-deck">
          <RadarChartCompat name={user_id} data={radarData} />
          <MyReports userId={user_id} />
        </div>

        <ArtistsCards artists={artists} />
      </>
    );
  }
}

export default DisplayProfile;
