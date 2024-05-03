import React from 'react';

const HTMLContent = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HTMLContent;
