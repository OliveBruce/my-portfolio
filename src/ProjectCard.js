import "./ProjectCard.css";

function ProjectCard({ project }) {
  const handleImgClick = () => {
    window.open(project.link, "_blank");
  };

  return (
    <div className="project-card">
      <div className="project-img-title-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          onClick={handleImgClick}
        />
        <h3 className="project-title">{project.title}</h3>
      </div>
      <div className="project-description-container">
        <p className="project-tech">Tech: {project.tech}</p>
        <p className="project-description">{project.description}</p>
        <ul className="project-bulletpoints">
          {project.bulletpoints.map((point, index) => (
            <li key={index} className="project-bulletpoint">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectCard;
