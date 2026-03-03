import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumb = ({ activeTab }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center text-sm text-gray-600">
        <span className="font-medium">Dashboard</span>
        <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
        <span className="capitalize">{activeTab}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;