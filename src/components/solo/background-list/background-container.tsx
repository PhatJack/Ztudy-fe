"use client";
import React, { useState } from "react";
import BackgroundTypesList from "./background-types-list";
import BackgroundOptionsList from "./background-options-list";

const BackgroundContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <>
      <BackgroundTypesList activeTab={activeTab} setActiveTab={setActiveTab} />
      <BackgroundOptionsList activeTab={activeTab} />
    </>
  );
};

export default BackgroundContainer;
