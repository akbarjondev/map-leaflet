import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { control as control_speed } from "../store/speed";

const StyledController = styled.div.attrs({
  className: "controller",
})`
  padding: 20px;
  min-width: 400px;

  .controller__wrapper {
    display: flex;
    flex-direction: column;
  }
`;

const Controller = () => {
  const [control, setControl] = useState(10);
  const dispatch = useDispatch();
  const { speed } = useSelector((state) => state.speedControl);

  useEffect(() => {
    dispatch(control_speed({ control: control }));
  }, [control]);

  return (
    <StyledController>
      <div className="controller__wrapper">
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          id="speed"
          value={control}
          onChange={(e) => {
            setControl(e.target.value);
          }}
        />
        <label htmlFor="speed">Speed: {speed}</label>
      </div>
    </StyledController>
  );
};

export default Controller;
