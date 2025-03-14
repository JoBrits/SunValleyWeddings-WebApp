import React from "react";
import Button from "../components/Button";
import renderer from "react-test-renderer";
import store from "../store/store";
import { Provider } from "react-redux";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Button />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
