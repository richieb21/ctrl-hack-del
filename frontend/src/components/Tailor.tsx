import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import DraggableSection from "./tailor/DraggableSection";
import { useResume } from "../context/ResumeContext";
import "./Tailor.css";
import { api } from "../services/api";

const Tailor: React.FC = () => {
  const { resume, loading, error, setResume, refreshResume } = useResume();

  const onDragEnd = (result: DropResult) => {
    if (!resume) return;

    const { source, destination, type } = result;
    if (!destination) return;

    const newResume = { ...resume };

    if (type === "section") {
      const [removed] = newResume.sections.splice(source.index, 1);
      newResume.sections.splice(destination.index, 0, removed);
    } else if (type === "subsection") {
      const sourceSectionIndex = newResume.sections.findIndex(
        (section) => section.id === source.droppableId
      );
      const destinationSectionIndex = newResume.sections.findIndex(
        (section) => section.id === destination.droppableId
      );

      if (sourceSectionIndex === -1 || destinationSectionIndex === -1) return;

      const sourceSection = newResume.sections[sourceSectionIndex];
      const destinationSection = newResume.sections[destinationSectionIndex];

      const [movedItem] = sourceSection.items.splice(source.index, 1);
      destinationSection.items.splice(destination.index, 0, movedItem);
    } else if (type === "bullet") {
      const sourceItem = newResume.sections
        .flatMap((section) => section.items)
        .find((item) => item.id === source.droppableId);
      const destinationItem = newResume.sections
        .flatMap((section) => section.items)
        .find((item) => item.id === destination.droppableId);

      if (!sourceItem || !destinationItem) return;

      const [movedPoint] = sourceItem.subPoints.splice(source.index, 1);
      destinationItem.subPoints.splice(destination.index, 0, movedPoint);
    }

    setResume(newResume);
  };

  const handleSave = async () => {
    if (!resume) return;

    try {
      // await api.saveResumeJSON(resume);
      alert("Resume order saved successfully!");
    } catch (err) {
      console.error("Error saving resume order:", err);
      alert("Failed to save resume order. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={refreshResume}>Retry</button>
      </div>
    );
  }

  if (!resume) {
    return <div>No resume data available.</div>;
  }

  return (
    <div className="tailor">
      {resume && resume.sections && resume.sections.length > 0 ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections" type="section">
              {(provided) => (
                <div
                  className="sections"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {resume.sections.map((section, index) => (
                    <DraggableSection
                      key={section.id}
                      section={section}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button onClick={handleSave}>Save Changes</button>
        </>
      ) : (
        <div>Loading resume sections...</div>
      )}
    </div>
  );
};

export default Tailor;
