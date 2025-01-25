import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaTachometerAlt,
  FaUsers,
  FaBlog,
  FaCogs,
  FaList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
  background: ${({ theme }) => theme.sidebarBackground};
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  }
`;

const SidebarContent = styled.div`
  width: 250px;
  padding: 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
`;

const NavList = styled.nav`
  flex: 1;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 12px;

  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }

  &.active {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled.div`
  padding: 24px;
`;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/blogs', icon: <FaBlog />, label: 'Blogs' },
    { path: '/admin/services', icon: <FaList />, label: 'Services' },
    { path: '/admin/settings', icon: <FaCogs />, label: 'Settings' }
  ];

  return (
    <Container>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarContent>
          <Logo>ContentKosh</Logo>
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.path} to={item.path} end={item.path === '/admin'}>
                {item.icon}
                <span>{item.label}</span>
              </NavItem>
            ))}
          </NavList>
        </SidebarContent>
      </Sidebar>

      <MainContent sidebarOpen={sidebarOpen}>
        <Header>
          <HeaderLeft>
            <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </IconButton>
          </HeaderLeft>

          <HeaderRight>
            <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
            <IconButton onClick={handleLogout}>
              <FaSignOutAlt />
            </IconButton>
          </HeaderRight>
        </Header>

        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </Container>
  );
};

export default AdminLayout;
