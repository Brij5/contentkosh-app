import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  font-weight: 700;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${({ theme, color }) => color}15;
  color: ${({ color }) => color};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-weight: 600;
`;

const ActivityList = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'user':
        return theme.primaryColor + '15';
      case 'content':
        return theme.successColor + '15';
      default:
        return theme.textColorLight + '15';
    }
  }};
  color: ${({ theme, type }) => {
    switch (type) {
      case 'user':
        return theme.primaryColor;
      case 'content':
        return theme.successColor;
      default:
        return theme.textColorLight;
    }
  }};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;

  strong {
    font-weight: 600;
  }
`;

const ActivityTime = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Dashboard = () => {
  const stats = [
    {
      icon: <FiUsers />,
      value: '1,234',
      label: 'Total Users',
      color: '#4CAF50'
    },
    {
      icon: <FiFileText />,
      value: '567',
      label: 'Total Content',
      color: '#2196F3'
    },
    {
      icon: <FiActivity />,
      value: '89%',
      label: 'Engagement Rate',
      color: '#9C27B0'
    },
    {
      icon: <FiTrendingUp />,
      value: '+12.5%',
      label: 'Growth Rate',
      color: '#F44336'
    }
  ];

  const recentActivity = [
    {
      type: 'user',
      icon: <FiUsers />,
      text: <><strong>John Doe</strong> created a new account</>,
      time: '5 minutes ago'
    },
    {
      type: 'content',
      icon: <FiFileText />,
      text: <><strong>Sarah Smith</strong> published a new article</>,
      time: '15 minutes ago'
    },
    {
      type: 'user',
      icon: <FiUsers />,
      text: <><strong>Mike Johnson</strong> updated their profile</>,
      time: '1 hour ago'
    }
  ];

  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <IconWrapper color={stat.color}>
              {stat.icon}
            </IconWrapper>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </StatsGrid>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent Activity</SectionTitle>
        </SectionHeader>

        <ActivityList>
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon type={activity.type}>
                {activity.icon}
              </ActivityIcon>
              <ActivityContent>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>
                  <FiClock size={12} />
                  {activity.time}
                </ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </Section>
    </Container>
  );
};

export default Dashboard; 