// components/CustomMeta.js

import React from "react";

const CustomMeta = ({ title, description }) => {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </head>
  );
};

export default CustomMeta;
