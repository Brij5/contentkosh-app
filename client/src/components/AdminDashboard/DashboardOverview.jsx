import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUsers, FaBlog, FaEnvelope, FaChartLine, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
`;

const StatChange = styled.div`
  color: ${({ positive }) => (positive ? '#10B981' : '#EF4444')};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    transform: ${({ positive }) => (positive ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

const QuickActions = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const RecentActivity = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityList = styled.div`
  margin-top: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 12px;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    users: { value: 0, change: 0 },
    blogs: { value: 0, change: 0 },
    contacts: { value: 0, change: 0 },
    views: { value: 0, change: 0 }
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }

      setStats(data.stats);
      setActivities(data.activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Dashboard Overview</Title>

      <StatsGrid>
        <StatCard>
          <StatIcon color="#3B82F6">
            <FaUsers />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.users.value}</StatValue>
            <StatLabel>Total Users</StatLabel>
            <StatChange positive={stats.users.change > 0}>
              <FaChartLine />
              {Math.abs(stats.users.change)}% from last month
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon color="#10B981">
            <FaBlog />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.blogs.value}</StatValue>
            <StatLabel>Published Blogs</StatLabel>
            <StatChange positive={stats.blogs.change > 0}>
              <FaChartLine />
              {Math.abs(stats.blogs.change)}% from last month
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon color="#8B5CF6">
            <FaEnvelope />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.contacts.value}</StatValue>
            <StatLabel>New Contacts</StatLabel>
            <StatChange positive={stats.contacts.change > 0}>
              <FaChartLine />
              {Math.abs(stats.contacts.change)}% from last month
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon color="#F59E0B">
            <FaChartLine />
          </StatIcon>
          <StatContent>
            <StatValue>{stats.views.value}</StatValue>
            <StatLabel>Total Views</StatLabel>
            <StatChange positive={stats.views.change > 0}>
              <FaChartLine />
              {Math.abs(stats.views.change)}% from last month
            </StatChange>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <SectionTitle>Quick Actions</SectionTitle>
        <ActionGrid>
          <ActionButton to="/admin/blogs/new">
            <FaPlus /> Create Blog Post
          </ActionButton>
          <ActionButton to="/admin/services/new">
            <FaPlus /> Add Service
          </ActionButton>
          <ActionButton to="/admin/users/new">
            <FaPlus /> Add User
          </ActionButton>
        </ActionGrid>
      </QuickActions>

      <RecentActivity>
        <SectionTitle>Recent Activity</SectionTitle>
        <ActivityList>
          {activities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon color={activity.color}>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </Container>
  );
};

export default DashboardOverview;
