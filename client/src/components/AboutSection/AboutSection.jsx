import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.cardBackground} 0%,
    ${({ theme }) => theme.backgroundColor} 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textColor};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.9;
  line-height: 1.6;
  animation: ${fadeInUp} 0.6s ease-out 0.2s backwards;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const TeamMemberCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out backwards;
  animation-delay: ${({ index }) => `${0.4 + index * 0.2}s`};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.1);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.backgroundColor});
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const MemberName = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1rem;
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    opacity: 1;
  }
`;

const AboutSection = ({ teamMembers = [], theme }) => {
  return (
    <Section id="about" theme={theme}>
      <Container>
        <Title theme={theme}>About Us</Title>
        <Description theme={theme}>
          We are a team of passionate content creators, SEO specialists, and digital marketing
          experts dedicated to helping businesses succeed in the digital world.
        </Description>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} theme={theme} index={index}>
              <ImageWrapper theme={theme}>
                <MemberImage src={member.image} alt={member.name} />
              </ImageWrapper>
              <MemberInfo>
                <MemberName theme={theme}>{member.name}</MemberName>
                <MemberRole theme={theme}>{member.role}</MemberRole>
                <SocialLinks>
                  <SocialLink href="#" theme={theme} aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </SocialLink>
                  <SocialLink href="#" theme={theme} aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </SocialLink>
                </SocialLinks>
              </MemberInfo>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      </Container>
    </Section>
  );
};

AboutSection.propTypes = {
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ),
  theme: PropTypes.object.isRequired
};

export default AboutSection;
