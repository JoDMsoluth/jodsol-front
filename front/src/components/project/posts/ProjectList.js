import React from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, loading, projectError }) {
  if (projectError) {
    console.log('post is not exist');
  }
  if (loading || !projects) {
    return null;
  }
  const projectsLength = Math.ceil(projects.length / 3);
  return (
    <>
      <ContentListWrap level={projectsLength}>
        {projects.map((project, i) => (
          <ProjectCard key={`${project.title}${i}`} project={project} />
        ))}
      </ContentListWrap>
    </>
  );
}

const ContentListWrap = styled.div`
  padding: 3rem 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: ${props =>
    props.level === 1
      ? '22rem'
      : props.level === 2
      ? '22rem 22rem'
      : props.level === 3
      ? '22rem 22rem 22rem'
      : '0rem'};
`;
