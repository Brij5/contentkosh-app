import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 1.5rem;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: ${({ theme, active }) => active ? theme.primaryColor : theme.textColorLight};
  font-size: 0.875rem;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.primaryColor};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabIndicator = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  height: 2px;
  background: ${({ theme }) => theme.primaryColor};
`;

const TabPanel = styled(motion.div)`
  padding: 0.5rem;
`;

const tabVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const tabTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 }
};

const Tabs = ({
  tabs,
  defaultTab,
  onChange,
  animated = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [direction, setDirection] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    if (activeTab && tabRefs.current[activeTab]) {
      const tabElement = tabRefs.current[activeTab];
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = tabElement.parentElement.getBoundingClientRect();

      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left
      });
    }
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = tabs.findIndex(tab => tab.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <TabsContainer className={className}>
      <TabList role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            ref={el => tabRefs.current[tab.id] = el}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            active={activeTab === tab.id}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
        <TabIndicator
          initial={false}
          animate={{
            width: indicatorStyle.width,
            x: indicatorStyle.left
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
        />
      </TabList>

      <AnimatePresence
        initial={false}
        custom={direction}
        mode="wait"
      >
        <TabPanel
          key={activeTab}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={activeTab}
          custom={direction}
          variants={animated ? tabVariants : null}
          initial={animated ? "enter" : false}
          animate={animated ? "center" : false}
          exit={animated ? "exit" : false}
          transition={tabTransition}
        >
          {activeTabContent}
        </TabPanel>
      </AnimatePresence>
    </TabsContainer>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  })).isRequired,
  defaultTab: PropTypes.string,
  onChange: PropTypes.func,
  animated: PropTypes.bool,
  className: PropTypes.string
};

export default Tabs; 