import React, { useState, useMemo } from "react";
import {
  StyledServicesSection,
  StyledServicesTitle,
  StyledTabContainer,
  StyledTabButton,
  StyledSearchBar,
  StyledSearchInput,
  StyledSearchIcon,
  StyledServiceGrid,
} from "./ServicesSection.styled";
import ServiceCard from "./ServiceCard";

const ServicesSection = ({ services, theme }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        if (selectedTab === "All") return true;
        return service.category.includes(selectedTab);
      })
      .filter((service) =>
        service.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  }, [services, selectedTab, searchQuery]);

  return (
    <StyledServicesSection theme={theme}>
      <StyledServicesTitle>Our Services</StyledServicesTitle>
      <StyledTabContainer>
        {["All", "Academic", "Non-Academic", "Marketing"].map((tab) => (
          <StyledTabButton key={tab} selected={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
            {tab}
          </StyledTabButton>
        ))}
      </StyledTabContainer>
      <StyledSearchBar>
        <StyledSearchInput
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <StyledSearchIcon />
      </StyledSearchBar>
      <StyledServiceGrid>
        {filteredServices.map((service) => (
          <ServiceCard key={service.category} service={service} theme={theme} />
        ))}
      </StyledServiceGrid>
    </StyledServicesSection>
  );
};

export default ServicesSection;
