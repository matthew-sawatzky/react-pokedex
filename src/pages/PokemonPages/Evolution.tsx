import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";

function Evolution() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

  }, [dispatch])

  return <div>Evolution</div>;
}

export default Evolution;
