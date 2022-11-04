import React, { useContext } from "react";
import { ResidentContext } from "../context/residentcontext";

function Error() {
  const { isError, errorMessage } = useContext(ResidentContext);
  return isError ? (
    <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
      {errorMessage}
    </div>
  ) : null;
}

export default Error;
