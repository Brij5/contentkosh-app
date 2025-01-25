import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { logoutUser } from '../store/actions/authActions';
import { toast } from 'react-toastify';
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiSettings,
  FiFileText,
  FiLogOut,
  FiBell,
  FiUser,
  FiLayout
} from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.backgroundPrimary};
`;

const Sidebar = styled(motion.aside)`
  width: 280px;
  background: ${({ theme }) => theme.cardBackground};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    position: fixed;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primaryColor};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: 1.5rem;
`;

const NavSectionTitle = styled.h3`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${({ theme, active }) => active ? theme.primaryColor : theme.textColorLight};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: ${({ active }) => active ? '600' : '500'};
  background: ${({ theme, active }) => active ? theme.primaryColor + '10' : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }
`;

const UserInfo = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const UserDetails = styled.div`
  flex: 1;
  overflow: hidden;
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.8rem;
`;

const Header = styled.header`
  height: 64px;
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
  left: ${({ sidebarWidth }) => sidebarWidth}px;
  z-index: 90;
  transition: left 0.3s ease;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.textColor};
  }
`;

const Content = styled.main`
  flex: 1;
  margin-left: ${({ sidebarWidth }) => sidebarWidth}px;
  padding: 84px 1.5rem 1.5rem;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SIDEBAR_WIDTH = 280;

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/dashboard') return 'Dashboard';
    if (path === '/admin/users') return 'Users Management';
    if (path === '/admin/content') return 'Content Management';
    if (path === '/admin/settings') return 'Settings';
    return 'Admin Panel';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    {
      section: 'Dashboard',
      items: [
        { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' }
      ]
    },
    {
      section: 'Content',
      items: [
        { path: '/admin/content', icon: <FiFileText />, label: 'Content' }
      ]
    },
    {
      section: 'Management',
      items: [
        { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
        { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
      ]
    }
  ];

  return (
    <Container>
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ type: 'tween' }}
            isOpen={isSidebarOpen}
          >
            <SidebarHeader>
              <Logo to="/admin">
                <LogoIcon><FiLayout /></LogoIcon>
                ContentKosh
              </Logo>
              <CloseButton onClick={() => setIsSidebarOpen(false)}>
                <FiX size={24} />
              </CloseButton>
            </SidebarHeader>

            <Navigation>
              {navItems.map((section) => (
                <NavSection key={section.section}>
                  <NavSectionTitle>{section.section}</NavSectionTitle>
                  {section.items.map((item) => (
                    <NavItem
                      key={item.path}
                      to={item.path}
                      active={location.pathname === item.path ? 1 : 0}
                    >
                      {item.icon}
                      {item.label}
                    </NavItem>
                  ))}
                </NavSection>
              ))}
            </Navigation>

            <UserInfo>
              <UserAvatar>{getInitials(user?.name)}</UserAvatar>
              <UserDetails>
                <UserName>{user?.name || 'Admin User'}</UserName>
                <UserRole>{user?.role || 'Administrator'}</UserRole>
              </UserDetails>
              <IconButton onClick={handleLogout}>
                <FiLogOut size={20} />
              </IconButton>
            </UserInfo>
          </Sidebar>
        )}
      </AnimatePresence>

      <Header sidebarWidth={isSidebarOpen ? SIDEBAR_WIDTH : 0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FiMenu size={24} />
          </MenuButton>
          <PageTitle>{getPageTitle()}</PageTitle>
        </div>

        <HeaderActions>
          <IconButton>
            <FiBell size={20} />
          </IconButton>
          <IconButton>
            <FiUser size={20} />
          </IconButton>
          <IconButton onClick={handleLogout} title="Logout">
            <FiLogOut size={20} />
          </IconButton>
        </HeaderActions>
      </Header>

      <Content sidebarWidth={isSidebarOpen ? SIDEBAR_WIDTH : 0}>
        <Outlet />
      </Content>
    </Container>
  );
};

export default AdminLayout;