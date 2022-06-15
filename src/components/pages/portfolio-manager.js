import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManger extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
    };

    this.handleSuccessfulFormSubmission =
      this.handleSuccessfulFormSubmission.bind(this);
    this.handleSuccessfulFormSubmissionError =
      this.handleSuccessfulFormSubmissionError.bind(this);
  }

  handleSuccessfulFormSubmission() {
    //TOD
    // update the portfolioItem state
    // and the portfolioItems to the list
  }

  handleSuccessfulFormSubmissionError(error) {
    console.log("handleSuccessfulFormSubmissionError", error);
  }

  getPortfolioItems() {
    axios
      .get("https://kierturpin.devcamp.space/portfolio/portfolio_items", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          portfolioItems: [...response.data.portfolio_items],
        });
        console.log(this.state.portfolioItems);
      })
      .catch((error) => {
        console.log("error in get PortfolioItems", error);
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleSuccessfulFormSubmissionError={
              this.handleSuccessfulFormSubmissionError
            }
          />
        </div>

        <div className="right-column">
          <PortfolioSidebarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
