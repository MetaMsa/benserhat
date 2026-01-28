import Projects from "./projects";

export const metadata = {
  title: "Projeler",
  alternates: {
    canonical: "https://benserhat.com/projects"
  }
};

export default function ProjectsLayout() {
    return (
        <Projects />
    );
}