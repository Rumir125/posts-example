import "@testing-library/jest-dom";
import React from "react";

jest.mock("./config/constants", () => {
  return {
    getAPIUrl: () => "http://localhost:3000/api",
  };
});

global.React = React; // this also works for other globally available libraries
